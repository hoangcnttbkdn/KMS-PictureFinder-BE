import { ImageUrl } from '.'

export interface WorkerData {
  arrayLink: Array<ImageUrl>
  sessionId: number
  targetImage: string
  email?: string
}
