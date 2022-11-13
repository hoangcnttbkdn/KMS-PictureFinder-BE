import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { CreateUserDto } from '../dtos'
import { createAxios } from '../utils'

export class HomeController {
  public home = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const axiosTest = createAxios({
        baseUrl: 'https://laptopstoreapi.jthanh8144.tk/',
        headers: { 'content-type': 'application/json' },
      })
      const data = await axiosTest.get('/brands')
      console.log(data)
      res.status(StatusCodes.OK).json({ message: 'home ne home ne' })
    } catch (error) {
      next(error)
    }
  }

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
}
