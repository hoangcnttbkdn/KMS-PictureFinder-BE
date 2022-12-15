import { NextFunction, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { SessionTypeEnum, TypeRecognizeEnum } from '../../shared/constants'
import { CustomRequest } from '../typings'
import { saveToDatabase } from '../utils'
import { addJob } from '../workers'

export class FacebookController {
  public handle = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      /* c8 ignore start */
      const { albumUrl, email } = req.body
      const sessionId = await saveToDatabase(
        albumUrl,
        req.targetImageUrl,
        SessionTypeEnum.FACEBOOK,
        TypeRecognizeEnum.FACE,
        req.arrayLink,
        email,
      )
      res.status(StatusCodes.OK).json({ sessionId })
      addJob({
        arrayLink: req.arrayLink,
        sessionId,
        targetData: req.targetImageUrl,
        type: SessionTypeEnum.FACEBOOK,
        typeRecognize: TypeRecognizeEnum.FACE,
        email,
      })
    } catch (error) {
      next(error)
    }
    /* c8 ignore end */
  }

  public handleBib = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { albumUrl, email, bib } = req.body
      if (!bib) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: 'BIB is required' })
        return
      }
      /* c8 ignore start */
      const sessionId = await saveToDatabase(
        albumUrl,
        bib,
        SessionTypeEnum.FACEBOOK,
        TypeRecognizeEnum.BIB,
        req.arrayLink,
        email,
      )
      res.status(StatusCodes.OK).json({ sessionId })
      addJob({
        arrayLink: req.arrayLink,
        sessionId,
        targetData: bib,
        type: SessionTypeEnum.FACEBOOK,
        typeRecognize: TypeRecognizeEnum.BIB,
        email,
      })
    } catch (error) {
      next(error)
    }
    /* c8 ignore end */
  }

  public handleClothes = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { albumUrl, email } = req.body
      /* c8 ignore start */
      const sessionId = await saveToDatabase(
        albumUrl,
        req.targetImageUrl,
        SessionTypeEnum.FACEBOOK,
        TypeRecognizeEnum.CLOTHES,
        req.arrayLink,
        email,
      )
      res.status(StatusCodes.OK).json({ sessionId })
      addJob({
        arrayLink: req.arrayLink,
        sessionId,
        targetData: req.targetImageUrl,
        type: SessionTypeEnum.FACEBOOK,
        typeRecognize: TypeRecognizeEnum.CLOTHES,
        email,
      })
    } catch (error) {
      next(error)
    }
    /* c8 ignore end */
  }
}
