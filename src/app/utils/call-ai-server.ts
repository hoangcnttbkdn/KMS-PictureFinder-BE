import FormData from 'form-data'
import { Readable } from 'stream'
import axios from 'axios'

import { ImageUrl } from '../typings'
import { SessionRepository, ImageRepository } from '../repositories'
import { environment } from '../../shared/constants'
import { logger } from '../../shared/providers'
import { sleep } from '.'

const imageRepository = new ImageRepository()
const sessionRepository = new SessionRepository()

export const handleCallApiForFacebook = async (
  arrayLink: Array<ImageUrl>,
  targetImage: Buffer,
  sessionId: number,
) => {
  logger.log(`${process.pid} is handling request ${sessionId}.`)
  const listFormData = []
  let totalBytes = environment.formSizeLimit
  let data = new FormData()
  for (let i = 0; i < arrayLink.length; i++) {
    const res = await axios({
      url: arrayLink[i].url,
      responseType: 'arraybuffer',
    })
    const buffer64 = Buffer.from(res.data, 'binary')
    data.append(
      'list_images',
      Readable.from(buffer64),
      `${arrayLink[i].id}.png`,
    )
    if (totalBytes - buffer64.length >= 0 && i !== arrayLink.length - 1) {
      totalBytes -= buffer64.length
    } else {
      data.append('target_image', Readable.from(targetImage), `target.png`)
      listFormData.push(data)
      totalBytes = environment.formSizeLimit
      data = new FormData()
    }
    await sleep(200)
  }
  for (const form of listFormData) {
    const rs = await axios({
      url: `${process.env.AI_API_SERVER}/face-findor`,
      method: 'POST',
      data: form,
      headers: { ...data.getHeaders() },
    })
    Object.keys(rs.data).forEach(async (key: string) => {
      const value = rs.data[key]
      const code = key.split('.')[0]
      if (value['match_face']) {
        await imageRepository.updateImage(code, sessionId, {
          isMatched: true,
          recognizedAt: new Date(),
          extraData: JSON.stringify({
            numberOfFace: value['num_of_face'],
            faceLocation: value['face_location'],
            confident: value['confident'],
          }),
        })
      } else {
        await imageRepository.updateImage(code, sessionId, {
          recognizedAt: new Date(),
          extraData: JSON.stringify({
            numberOfFace: value['num_of_face'],
            faceLocation: value['face_location'],
            confident: value['confident'],
          }),
        })
      }
    })
  }
  await sessionRepository.updateStatus(sessionId)
  logger.log(`Request ${sessionId} done!`)
}
