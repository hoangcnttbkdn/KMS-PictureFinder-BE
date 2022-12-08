import { Router } from 'express'
import { SessionController } from '../controllers'

class SessionRoute {
  public path = '/api/sessions'
  public router = Router()

  private sessionController: SessionController

  constructor() {
    this.sessionController = new SessionController()
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.route('/:id').get(this.sessionController.getSessionById)
    this.router
      .route('/:id/images')
      .get(this.sessionController.getImagesBySessionId)
  }
}

export const sessionRoute = new SessionRoute()
