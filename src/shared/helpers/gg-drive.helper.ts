import { GetFileList } from 'google-drive-getfilelist'
import { logger } from '../providers/'
import { Readable } from 'stream'
import FormData from 'form-data'
import axios from 'axios'
import * as fs from 'fs'

export class GoogleDriveHelper {
  private GG_API_KEY: string = process.env.GG_API_KEY
  private AI_SERVER_URL: string =
    'http://home-server.silk-cat.software:3000/face-findor'

  public getGoogleImgLink = (folderId: string, callback: Function) => {
    const resource = {
      auth: this.GG_API_KEY,
      id: folderId,
      fields: 'files(id)',
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
            url: `https://www.googleapis.com/drive/v3/files/${f.id}?alt=media&key=${this.GG_API_KEY}`,
          }
        },
      )
      callback(fileInfors)
    })
  }

  public recognizeWithGGDrive = (folderId: string, callback: Function) => {
    const formData = new FormData()
    this.getGoogleImgLink(folderId, async (files: FileInfor[]) => {
      // LIST IMAGES
      files.forEach(async (file: FileInfor) => {
        const fileRes = await axios({
          url: file.url,
          responseType: 'arraybuffer',
        })
        const buffer64 = Buffer.from(fileRes.data, 'binary')
        formData.append(
          'list_images',
          Readable.from(buffer64),
          `${file.id}.png`,
        )
      })
      // TARGET IMAGE
      const fileRes = await axios({
        url: files[0].url,
        responseType: 'arraybuffer',
      })
      const buffer64 = Buffer.from(fileRes.data, 'binary')
      formData.append(
        'target_image',
        Readable.from(buffer64),
        `${files[0].id}.png`,
      )

      // formData.append(
      //   'list_images',
      //   fs.createReadStream('/home/phuocleoceo/Downloads/IMG_3266.JPG'),
      // )
      // formData.append(
      //   'list_images',
      //   fs.createReadStream('/home/phuocleoceo/Downloads/IMG_3267.JPG'),
      // )
      // formData.append(
      //   'target_image',
      //   fs.createReadStream('/home/phuocleoceo/Downloads/IMG_3270.JPG'),
      // )

      const config = {
        method: 'post',
        url: this.AI_SERVER_URL,
        headers: {
          ...formData.getHeaders(),
        },
        data: formData,
      }

      try {
        const response = await axios(config)
        callback(response, null)
      } catch (err) {
        callback(null, err)
      }
    })
  }
}

interface FileDriveResponse {
  id: string
}

interface FileInfor {
  id: string
  url: string
}
