import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { CreateUserDto } from '../dtos'
import { createAxios } from '../utils'
import { CustomRequest } from '../typings/request'

export class HomeController {
  public upload = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      console.log(req.targetImage)
      res.json('ok')
    } catch (error) {
      next(error)
    }
  }
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
