import { NextFunction, Request, Response } from 'express'
import { GoogleDriveHelper } from '../../shared/helpers'
import { StatusCodes } from 'http-status-codes'

export class GoogleDriveController {
  private googleDriveHelper: GoogleDriveHelper

  constructor() {
    this.googleDriveHelper = new GoogleDriveHelper()
  }

  public download = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { folderId } = req.body
      this.googleDriveHelper.recognizeWithGGDrive(
        folderId,
        (response: any, error: any) => {
          if (!error) {
            res.status(StatusCodes.OK).json(response.data)
          } else {
            res.status(StatusCodes.BAD_REQUEST).json(error)
          }
        },
      )
    } catch (error) {
      next(error)
    }
  }
}
