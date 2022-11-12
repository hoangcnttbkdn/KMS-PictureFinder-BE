import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { GoogleDriveHelper } from '../../shared/helpers'

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
      const folderId: string = req.query.folderId as string
      const result = this.googleDriveHelper.downloadFolder(folderId)
      console.log(result)
      res.status(StatusCodes.OK).json({ message: 'OK' })
    } catch (error) {
      next(error)
    }
  }
}
