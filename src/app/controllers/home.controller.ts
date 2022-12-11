import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { CreateUserDto } from '../dtos'

export class HomeController {
  public home = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      res.redirect('/docs')
      /* c8 ignore start */
    } catch (error) {
      next(error)
    }
    /* c8 ignore end */
  }

  /* c8 ignore start */
  public createUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const userData: CreateUserDto = req.body
      console.log(userData)
      res.status(StatusCodes.OK).json({ message: 'Create user' })
    } catch (error) {
      next(error)
    }
  }
  /* c8 ignore end */
}
