import { NextFunction, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { getAlbumId, fetchAllPhotoLinks } from '../helpers'
import { SessionTypeEnum } from '../../shared/constants'
import { CustomRequest } from '../typings'
import { saveToDatabase } from '../utils'
import { addJob } from '../workers'

export class FacebookController {
  public handle = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { accessToken, cookie, albumUrl, email } = req.body
      if (!accessToken || !cookie) {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: 'Access token and cookie is required' })
        return
      }
      const albumId = getAlbumId(albumUrl)
      if (!albumId) {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: 'Facebook album url is invalid' })
        return
      }
      if (email) {
        if (!String(email).match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
          res
            .status(StatusCodes.BAD_REQUEST)
            .json({ message: 'Email is invalid' })
          return
        }
      }
      const arrayLink = await fetchAllPhotoLinks(albumId, accessToken, cookie)
      console.log(arrayLink.length)

      const sessionId = await saveToDatabase(
        albumUrl,
        req.targetImageUrl,
        SessionTypeEnum.FACEBOOK,
        arrayLink,
        email,
      )
      res.status(StatusCodes.OK).json({ sessionId })
      addJob(sessionId, {
        arrayLink,
        sessionId: sessionId,
        targetImage: req.targetImageUrl,
        email,
      })
    } catch (error) {
      next(error)
    }
  }
}
