import { Router } from 'express'
import { HomeController } from '../controllers'

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
  }
}

export const homeRoute = new HomeRoute()
