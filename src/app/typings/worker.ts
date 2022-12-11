import { ImageUrl } from '.'
import { SessionTypeEnum } from '../../shared/constants'

export interface WorkerData {
  arrayLink: Array<ImageUrl>
  sessionId: number
  targetImage: string
  email?: string
  type: SessionTypeEnum
}
