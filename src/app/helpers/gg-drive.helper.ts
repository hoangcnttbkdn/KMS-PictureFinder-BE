import { GetFileList } from 'google-drive-getfilelist'
import { logger } from '../../shared/providers'
import { Readable } from 'stream'
import FormData from 'form-data'
import axios from 'axios'

export class GoogleDriveHelper {
  private GG_API_KEY: string = process.env.GG_API_KEY
  private AI_SERVER_URL: string =
    'http://home-server.silk-cat.software:3000/face-findor'

  public getGoogleImgLink = (folderId: string, callback: Function) => {
    const resource = {
      auth: this.GG_API_KEY,
      id: folderId,
      fields: 'files(id,name)',
    }

    return GetFileList(resource, (err: any, res: any) => {
      if (err) {
        logger.error(err)
        callback([])
        return
      }
      const files: FileDriveResponse[] = res.fileList.flatMap(
        ({ files }) => files,
      )
      const fileInfors: FileInfor[] = files.map(
        (f: FileDriveResponse): FileInfor => {
          return {
            id: f.id,
            name: f.name,
            url: `https://www.googleapis.com/drive/v3/files/${f.id}?alt=media&key=${this.GG_API_KEY}`,
          }
        },
      )
      callback(fileInfors)
    })
  }

  public recognizeWithGGDrive = (
    folderId: string,
    targetImage: Buffer,
    callback: Function,
  ) => {
    const formData = new FormData()
    this.getGoogleImgLink(folderId, async (files: FileInfor[]) => {
      // LIST IMAGES
      await Promise.all(
        files.map(async (file: FileInfor) => {
          const fileRes = await axios({
            url: file.url,
            responseType: 'arraybuffer',
          })
          const buffer64 = Buffer.from(fileRes.data, 'binary')
          formData.append('list_images', Readable.from(buffer64), file.name)
        }),
      )
      // TARGET IMAGE
      formData.append('target_image', Readable.from(targetImage), 'target.png')

      const config = {
        method: 'post',
        url: this.AI_SERVER_URL,
        headers: { ...formData.getHeaders() },
        data: formData,
      }

      try {
        const { data: apiData } = await axios(config)
        const result: FileInfor[] = []
        Object.keys(apiData).forEach((key: string) => {
          const value = apiData[key]
          if (value['match_face']) {
            result.push(files.find((item) => key.includes(item.name)))
          }
        })
        callback(result, null)
      } catch (err) {
        callback(null, err)
      }
    })
  }
}

interface FileDriveResponse {
  id: string
  name: string
}

interface FileInfor {
  id: string
  name: string
  url: string
}
