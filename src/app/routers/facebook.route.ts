import { Router } from 'express'
import { FacebookController } from '../controllers'
import {
  multerUploadMiddleware,
  fileUploadMiddleware,
  facebookMiddleware,
} from '../middlewares'

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
      .route('/face')
      .post(
        multerUploadMiddleware,
        fileUploadMiddleware,
        facebookMiddleware,
        this.facebookController.handle,
      )
    this.router
      .route('/bib')
      .post(facebookMiddleware, this.facebookController.handleBib)
    this.router
      .route('/clothes')
      .post(
        multerUploadMiddleware,
        fileUploadMiddleware,
        facebookMiddleware,
        this.facebookController.handleClothes,
      )
  }
}

export const facebookRoute = new FacebookRoute()
