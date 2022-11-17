import FormData from 'form-data'
import { Readable } from 'stream'
import axios from 'axios'

const sleep = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export const handleCallApiForFacebook = async (
  arrayLink: Array<{ id: any | string; url: any | string }>,
  targetImage: Buffer,
) => {
  const data = new FormData()
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
    await sleep(200)
  }
  data.append('target_image', Readable.from(targetImage), `target.png`)
  const result = await axios({
    url: `${process.env.AI_API_SERVER}/face-findor`,
    method: 'POST',
    data,
    headers: { ...data.getHeaders() },
  })
  return result.data
}
