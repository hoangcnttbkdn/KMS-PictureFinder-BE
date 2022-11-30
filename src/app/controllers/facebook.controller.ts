import { NextFunction, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { CustomRequest, ImageUrl } from '../typings'
import { handleCallApiForFacebook } from '../utils'
import { getAlbumId, fetchAllPhotoLinks } from '../helpers'

export class FacebookController {
  public handle = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { accessToken, cookie, albumUrl } = req.body
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
          .json({ message: 'Facebook album url is valid' })
        return
      }
      const arrayLink = await fetchAllPhotoLinks(albumId, accessToken, cookie)
      console.log(arrayLink.length)
      const response = await handleCallApiForFacebook(
        arrayLink,
        req.targetImage,
      )
      const result: Array<ImageUrl> = []
      Object.keys(response).forEach((key: string) => {
        const value = response[key]
        if (value['match_face']) {
          result.push(arrayLink.find((item) => key.split('.')[0] === item.id))
        }
      })
      res.status(StatusCodes.OK).json(result)
    } catch (error) {
      next(error)
    }
  }
}
