import Multer, { memoryStorage } from 'multer'
import { NextFunction, Response } from 'express'
import { CustomRequest } from '../typings/request'

export const multerUploadMiddleware = Multer({
  storage: memoryStorage(),
}).single('target_image')

export const fileUploadMiddleware = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    console.log(req.file.buffer)
    req.targetImage = req.file.buffer
    next()
  } catch (error) {
    next(error)
  }
}
