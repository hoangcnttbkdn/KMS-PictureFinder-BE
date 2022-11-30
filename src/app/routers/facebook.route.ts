import { Router } from 'express'
import { FacebookController } from '../controllers'
import { multerUploadMiddleware, fileUploadMiddleware } from '../middlewares'

class FacebookRoute {
  public path = '/api/facebook'
  public router = Router()

  private facebookController: FacebookController

  constructor() {
    this.facebookController = new FacebookController()
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router
      .route('/')
      .post(
        multerUploadMiddleware,
        fileUploadMiddleware,
        this.facebookController.handle,
      )
  }
}

export const facebookRoute = new FacebookRoute()
