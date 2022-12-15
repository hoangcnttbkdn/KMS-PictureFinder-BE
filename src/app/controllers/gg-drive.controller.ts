import { StatusCodes } from 'http-status-codes'
import { plainToInstance } from 'class-transformer'
import { NextFunction, Request, Response } from 'express'

import { GoogleOAuthHelper } from '../helpers'
import { SessionTypeEnum, TypeRecognizeEnum } from '../../shared/constants'
import { CustomRequest } from '../typings/request'
import { saveToDatabase } from '../utils'
import { UpdateTokenDto } from '../dtos'
import { addJob } from '../workers'

export class GoogleDriveController {
  private googleOAuthHelper: GoogleOAuthHelper

  constructor() {
    this.googleOAuthHelper = new GoogleOAuthHelper()
  }

  public recognizeFace = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { folderUrl, email } = req.body

      const sessionId = await saveToDatabase(
        folderUrl,
        req.targetImageUrl,
        SessionTypeEnum.DRIVE,
        TypeRecognizeEnum.FACE,
        req.arrayLink,
        email,
      )
      res.status(StatusCodes.OK).json({ sessionId })
      addJob({
        arrayLink: req.arrayLink,
        sessionId,
        targetData: req.targetImageUrl,
        type: SessionTypeEnum.DRIVE,
        typeRecognize: TypeRecognizeEnum.FACE,
        email,
      })
    } catch (error) {
      next(error)
    }
  }

  public recognizeBib = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { folderUrl, email, bib } = req.body
      if (!bib) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: 'BIB is required' })
        return
      }
      const sessionId = await saveToDatabase(
        folderUrl,
        bib,
        SessionTypeEnum.DRIVE,
        TypeRecognizeEnum.BIB,
        req.arrayLink,
        email,
      )
      res.status(StatusCodes.OK).json({ sessionId })
      addJob({
        arrayLink: req.arrayLink,
        sessionId,
        targetData: bib,
        type: SessionTypeEnum.DRIVE,
        typeRecognize: TypeRecognizeEnum.BIB,
        email,
      })
    } catch (error) {
      next(error)
    }
  }

  public recognizeClothes = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { folderUrl, email } = req.body

      const sessionId = await saveToDatabase(
        folderUrl,
        req.targetImageUrl,
        SessionTypeEnum.DRIVE,
        TypeRecognizeEnum.CLOTHES,
        req.arrayLink,
        email,
      )
      res.status(StatusCodes.OK).json({ sessionId })
      addJob({
        arrayLink: req.arrayLink,
        sessionId,
        targetData: req.targetImageUrl,
        type: SessionTypeEnum.DRIVE,
        typeRecognize: TypeRecognizeEnum.CLOTHES,
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
