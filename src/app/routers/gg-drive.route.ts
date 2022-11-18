import { Router } from 'express'
import { GoogleDriveController } from '../controllers'
import { multerUploadMiddleware, fileUploadMiddleware } from '../middlewares'

class GoogleDriveRoute {
  public path = '/api/gg-drive'
  public router = Router()

  private googleDriveController: GoogleDriveController

  constructor() {
    this.googleDriveController = new GoogleDriveController()
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router
      .route('/')
      .post(
        multerUploadMiddleware,
        fileUploadMiddleware,
        this.googleDriveController.recognize,
      )
  }
}

export const ggDriveRoute = new GoogleDriveRoute()
