import { Request } from 'express'
import { ImageUrl } from '../typings'

export interface CustomRequest extends Request {
  targetImage?: Buffer
  targetImageUrl?: string
  arrayLink?: Array<ImageUrl>
}
