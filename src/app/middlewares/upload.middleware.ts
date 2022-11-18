import { StatusCodes } from 'http-status-codes'
import Multer, { FileFilterCallback, memoryStorage } from 'multer'
import { NextFunction, Request, Response } from 'express'
import createError from 'http-errors'

import { CustomRequest } from '../typings/request'

export const multerUploadMiddleware = Multer({
  storage: memoryStorage(),
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    callback: FileFilterCallback,
  ) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      callback(null, true)
    } else {
      callback(
        createError(
          StatusCodes.BAD_REQUEST,
          'Only .png, .jpg and .jpeg format allowed!',
        ),
      )
    }
    if (
      +req.headers['content-length'] >
      +process.env.FILE_SIZE_LIMIT * 1024 * 1024
    ) {
      callback(createError(StatusCodes.REQUEST_TOO_LONG, 'File too large'))
    }
  },
}).single('target_image')

export const fileUploadMiddleware = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.file) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Target image is required' })
    }
    req.targetImage = req.file.buffer
    next()
  } catch (error) {
    next(error)
  }
}
