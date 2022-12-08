import { StatusCodes } from 'http-status-codes'
import Multer, { FileFilterCallback, memoryStorage } from 'multer'
import { NextFunction, Request, Response } from 'express'
import createError from 'http-errors'

import { CustomRequest } from '../typings/request'
import { environment } from '../../shared/constants'
import { s3Client } from '../../shared/configs/s3.config'

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
}).single('targetImage')

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
    const stored = await s3Client
      .upload({
        Bucket: environment.aws.bucket,
        Key: `kms-picture-finder/${Date.now()}-${Math.floor(
          Math.random() * 10000,
        )}.png`,
        Body: req.file.buffer,
      })
      .promise()
    req.targetImageUrl = stored['Location']
    next()
  } catch (error) {
    next(error)
  }
}
