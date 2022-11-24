import { CustomRequest } from '../typings/request'
import { NextFunction, Response } from 'express'
import { GoogleDriveHelper } from '../helpers'
import { StatusCodes } from 'http-status-codes'

export class GoogleDriveController {
  private googleDriveHelper: GoogleDriveHelper

  constructor() {
    this.googleDriveHelper = new GoogleDriveHelper()
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

      this.googleDriveHelper.recognizeWithGGDrive(
        folderUrl,
        req.targetImage,
        (result: any, error: any) => {
          if (!error) {
            res.status(StatusCodes.OK).json(result)
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
