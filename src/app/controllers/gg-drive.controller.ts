import { StatusCodes } from 'http-status-codes'
import { plainToInstance } from 'class-transformer'
import { NextFunction, Request, Response } from 'express'

import { GoogleDriveHelper, GoogleOAuthHelper } from '../helpers'
import { SessionTypeEnum } from '../../shared/constants'
import { CustomRequest } from '../typings/request'
import { saveToDatabase } from '../utils'
import { UpdateTokenDto } from '../dtos'
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
        type: SessionTypeEnum.DRIVE,
        email,
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
      const token = plainToInstance(UpdateTokenDto, req.body)
      await this.googleOAuthHelper.saveCredentials(token)
      res.status(StatusCodes.OK).json({ message: 'Update token success!' })
    } catch (error) {
      next(error)
    }
  }
}
