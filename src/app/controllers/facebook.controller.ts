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
      if (!albumUrl) {
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
      /* c8 ignore start */
      const albumId = getAlbumId(albumUrl)
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
      addJob({
        arrayLink,
        sessionId,
        targetImage: req.targetImageUrl,
        type: SessionTypeEnum.FACEBOOK,
        email,
      })
    } catch (error) {
      next(error)
    }
    /* c8 ignore end */
  }
}
