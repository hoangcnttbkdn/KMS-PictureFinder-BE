import { StatusCodes } from 'http-status-codes'
import { Request, Response, NextFunction } from 'express'

export const ggDriveMiddleware = (
  req: Request,
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
  next()
}
