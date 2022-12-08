import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { SessionRepository, ImageRepository } from '../repositories'

export class SessionController {
  private imageRepository: ImageRepository
  private sessionRepository: SessionRepository

  constructor() {
    this.imageRepository = new ImageRepository()
    this.sessionRepository = new SessionRepository()
  }

  public getSessionById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params
      const session = await this.sessionRepository.getSessionById(+id)
      res.status(StatusCodes.OK).json(session)
    } catch (error) {
      next(error)
    }
  }

  public getImagesBySessionId = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params
      const images = await this.imageRepository.getImagesBySessionId(+id)
      res.status(StatusCodes.OK).json(images)
    } catch (error) {
      next(error)
    }
  }
}
