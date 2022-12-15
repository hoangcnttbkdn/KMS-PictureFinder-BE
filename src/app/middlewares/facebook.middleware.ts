import { StatusCodes } from 'http-status-codes'
import { Response, NextFunction } from 'express'

import { getAlbumId, fetchAllPhotoLinks } from '../helpers'
import { CustomRequest } from '../typings'

export const facebookMiddleware = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
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
      res.status(StatusCodes.BAD_REQUEST).json({ message: 'Email is invalid' })
      return
    }
  }
  /* c8 ignore start */
  const albumId = getAlbumId(albumUrl)
  const arrayLink = await fetchAllPhotoLinks(albumId, accessToken, cookie)
  console.log(arrayLink.length)
  if (arrayLink.length === 0) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Token or cookie is expired' })
    return
  }
  req.arrayLink = arrayLink
  next()
  /* c8 ignore end */
}
