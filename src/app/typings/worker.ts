import { ImageUrl } from '.'
import { SessionTypeEnum } from '../../shared/constants'

export interface WorkerData {
  arrayLink: Array<ImageUrl>
  sessionId: number
  targetImage: string
  type: SessionTypeEnum
  email?: string
}
