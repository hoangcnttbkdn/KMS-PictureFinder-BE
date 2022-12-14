import { Router } from 'express'
import { GoogleDriveController } from '../controllers'
import {
  multerUploadMiddleware,
  fileUploadMiddleware,
  validationMiddleware,
} from '../middlewares'
import { UpdateTokenDto } from '../dtos'

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

    this.router
      .route('/token')
      .put(
        validationMiddleware(UpdateTokenDto, 'body', true),
        this.googleDriveController.updateToken,
      )
  }
}

export const ggDriveRoute = new GoogleDriveRoute()
