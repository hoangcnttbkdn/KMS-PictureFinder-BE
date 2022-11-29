import { Router } from 'express'
import { validationMiddleware } from '../middlewares'
import { HomeController } from '../controllers'
import { CreateUserDto } from '../dtos'

class HomeRoute {
  public path = '/'
  public router = Router()

  private homeController: HomeController

  constructor() {
    this.homeController = new HomeController()
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.route('/').get(this.homeController.home)
    this.router
      .route('/users')
      .post(
        validationMiddleware(CreateUserDto, 'body', true),
        this.homeController.createUser,
      )
  }
}

export const homeRoute = new HomeRoute()
