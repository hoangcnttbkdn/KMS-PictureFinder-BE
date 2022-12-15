import { StatusCodes } from 'http-status-codes'
import { Response, NextFunction } from 'express'
import { CustomRequest } from '../typings'
import { GoogleDriveHelper } from '../helpers'

export const ggDriveMiddleware = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const { folderUrl, email } = req.body
  if (!folderUrl) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'GGDrive folderUrl is required' })
    return
  }
  if (email) {
    if (!String(email).match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: 'Email is invalid' })
      return
    }
  }
  /* c8 ignore start */
  const arrayLink = await new GoogleDriveHelper().recognizeWithGGDrive(
    folderUrl,
  )
  if (arrayLink.length === 0) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Empty folder or token is expired' })
    return
  }
  req.arrayLink = arrayLink
  next()
  /* c8 ignore end */
}
