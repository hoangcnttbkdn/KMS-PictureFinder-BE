import { Router } from 'express'
import { GoogleDriveController } from '../controllers'

class GoogleDriveRoute {
  public path = '/api/gg-drive'
  public router = Router()

  private googleDriveController: GoogleDriveController

  constructor() {
    this.googleDriveController = new GoogleDriveController()
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.route('/').post(this.googleDriveController.download)
  }
}

export const ggDriveRoute = new GoogleDriveRoute()
