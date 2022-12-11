import { CustomRequest } from '../typings/request'
import { NextFunction, Request, Response } from 'express'
import { GoogleDriveHelper, GoogleOAuthHelper } from '../helpers'
import { StatusCodes } from 'http-status-codes'
import { SessionTypeEnum } from '../../shared/constants'
import { saveToDatabase } from '../utils'
import { addJob } from '../workers'

export class GoogleDriveController {
  private googleDriveHelper: GoogleDriveHelper
  private googleOAuthHelper: GoogleOAuthHelper

  constructor() {
    this.googleDriveHelper = new GoogleDriveHelper()
    this.googleOAuthHelper = new GoogleOAuthHelper()
  }

  public recognize = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { folderUrl, email } = req.body
      if (!folderUrl) {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: 'GGDrive folderUrl is required' })
        return
      }
      if (email) {
        if (!String(email).match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
          res
            .status(StatusCodes.BAD_REQUEST)
            .json({ message: 'Email is invalid' })
          return
        }
      }

      const arrayLink = await this.googleDriveHelper.recognizeWithGGDrive(
        folderUrl,
      )

      const sessionId = await saveToDatabase(
        folderUrl,
        req.targetImageUrl,
        SessionTypeEnum.DRIVE,
        arrayLink,
        email,
      )
      res.status(StatusCodes.OK).json({ sessionId })
      addJob({
        arrayLink,
        sessionId,
        targetImage: req.targetImageUrl,
        email,
        type: SessionTypeEnum.DRIVE,
      })
    } catch (error) {
      next(error)
    }
  }

  public updateToken = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      await this.googleOAuthHelper.saveCredentials(req.body)
      res.status(StatusCodes.OK).json({ message: 'OK' })
    } catch (error) {
      next(error)
    }
  }
}
