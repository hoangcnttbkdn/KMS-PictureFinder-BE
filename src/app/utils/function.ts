import { SessionRepository, ImageRepository } from '../repositories'
import { SessionTypeEnum } from '../../shared/constants'
import { ImageUrl } from '../typings'

/* c8 ignore start */
export const sleep = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export const saveToDatabase = async (
  albumUrl: string,
  targetImageUrl: string,
  type: SessionTypeEnum,
  arrayLink: Array<ImageUrl>,
  email?: string,
) => {
  const sessionRepository = new SessionRepository()
  const imageRepository = new ImageRepository()
  const session = await sessionRepository.save(
    sessionRepository.create({
      url: albumUrl,
      targetImageUrl,
      totalImages: arrayLink.length,
      type,
      isFinished: false,
      email,
    }),
  )
  for (const item of arrayLink) {
    await imageRepository.save(
      imageRepository.create({
        code: item.id,
        url: item.url,
        isMatched: false,
        session,
      }),
    )
  }
  return session.id
}
/* c8 ignore end */
