import { CustomRequest } from '../typings/request'
import { NextFunction, Request, Response } from 'express'
import { GoogleDriveHelper, GoogleOAuthHelper } from '../helpers'
import { StatusCodes } from 'http-status-codes'

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
      const { folderUrl } = req.body
      if (!folderUrl) {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: 'GGDrive folderUrl is required' })
        return
      }

      try {
        const result = await this.googleDriveHelper.recognizeWithGGDrive(
          folderUrl,
          req.targetImage,
        )
        res.status(StatusCodes.OK).json(result)
      } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json(error)
      }
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
