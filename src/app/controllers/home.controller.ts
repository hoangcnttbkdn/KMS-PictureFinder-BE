import { NextFunction, Request, Response } from 'express'

export class HomeController {
  public home = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      res.redirect('/docs')
      /* c8 ignore start */
    } catch (error) {
      next(error)
    }
    /* c8 ignore end */
  }
}
