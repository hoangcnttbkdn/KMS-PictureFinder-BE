import { NextFunction, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { AxiosInstance } from 'axios'

import { CustomRequest, ImageUrl } from '../typings'
import { createAxios, handleCallApiForFacebook } from '../utils'
import { getAlbumId } from '../helpers'

export class FacebookController {
  private axiosFB: AxiosInstance

  constructor() {
    this.axiosFB = createAxios({
      baseUrl: 'https://graph.facebook.com/v15.0/',
    })
  }

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
      const { data } = await this.axiosFB.get(`${albumId}/photos`, {
        params: { fields: 'largest_image', access_token: accessToken },
        headers: { cookie },
      })
      const arrayLink: Array<ImageUrl> = Array.from(data).map((item: any) => {
        return { id: item.id, url: item.largest_image.source }
      })
      const response = await handleCallApiForFacebook(
        arrayLink,
        req.targetImage,
      )
      const result: Array<ImageUrl> = []
      Object.keys(response).forEach((key: string) => {
        const value = response[key]
        if (value['match_face']) {
          result.push(arrayLink.find((item) => key.includes(item.id)))
        }
      })
      res.status(StatusCodes.OK).json(result)
    } catch (error) {
      next(error)
    }
  }
}
