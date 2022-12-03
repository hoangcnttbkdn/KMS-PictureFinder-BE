/* eslint-disable @typescript-eslint/ban-types */
import { JSONClient } from 'google-auth-library/build/src/auth/googleauth'
import { GetFileList } from 'google-drive-getfilelist'
import { GoogleOAuthHelper } from './gg-oauth.helper'
import { drive_v3, google } from 'googleapis'
import { Readable } from 'stream'
import FormData from 'form-data'
import axios from 'axios'
import { addJob } from './../../worker/MyWorker';

export class GoogleDriveHelper {
  private googleOAuthHelper: GoogleOAuthHelper
  private AI_SERVER_URL = `${process.env.AI_API_SERVER}/face-findor`

  constructor() {
    this.googleOAuthHelper = new GoogleOAuthHelper()
  }

  public recognizeWithGGDrive = async (
    folderUrl: string,
    targetImage: Buffer,
  ): Promise<FileInfor[]> => {
    const folderId = this.getGGDriveFolderId(folderUrl)
    if (!folderId) {
      throw { message: 'This folderUrl is not contain folderId' }
    }

    const auth = await this.googleOAuthHelper.authorize()
    const drive = google.drive({
      auth,
      version: 'v3',
    })

    const formData = new FormData()
    const files: FileInfor[] = await this.getGoogleImgLink(folderId, auth)

    // TODO: Save all file's info into database, create job queue
    for (let i = 0; i < 10; i++) {
      addJob({
        files: "Job " + i
      })
    }
    // TODO: Begin H1 block
    // Move H1 block to worker
    // LIST IMAGES
    // await Promise.all(
    //   files.map(async (file) => {
    //     const buffer64: any = await this.getGGBuffer(drive, file)
    //     formData.append('list_images', Readable.from(buffer64), file.id)
    //   }),
    // )
    // // TARGET IMAGE
    // formData.append('target_image', Readable.from(targetImage), 'target.png')

    // const config = {
    //   method: 'post',
    //   url: this.AI_SERVER_URL,
    //   headers: { ...formData.getHeaders() },
    //   data: formData,
    // }

    // try {
    //   const { data: apiData } = await axios(config)
    //   const result: FileInfor[] = []
    //   Object.keys(apiData).forEach((key: string) => {
    //     const value = apiData[key]
    //     if (value['match_face']) {
    //       const matchFile = files.find((item) => key.includes(item.id))
    //       result.push(matchFile)
    //     }
    //   })
    //   return result

    // } catch (err) {
    //   throw { message: 'Error when call AI server' }
    // }
    // TODO: End H1 block

    const result: FileInfor[] = [];
    return result;
  }

  private getGGDriveFolderId = (folderUrl: string): string => {
    const regex = /(?<=folders\/)[^? \n\r\t]*/
    const expression = folderUrl.match(regex)
    if (expression != null) {
      return expression[0]
    }
    return ''
  }

  private getGoogleImgLink = (
    folderId: string,
    auth: JSONClient,
  ): Promise<FileInfor[]> => {
    return new Promise((resolve, reject) => {
      const resource = {
        auth,
        id: folderId,
        fields: 'files(id,name,thumbnailLink)',
      }
      GetFileList(resource, (err: any, res: any) => {
        if (err) return reject([])
        const files = res.fileList.flatMap(({ files }) => files)
        const fileInfors: FileInfor[] = files.map((f: any): FileInfor => {
          return {
            id: f.id || '',
            url: f.thumbnailLink || '',
          }
        })
        resolve(fileInfors)
      })
    })
  }

  private getGGBuffer = (
    drive: drive_v3.Drive,
    file: FileInfor,
  ): Promise<Buffer> => {
    return new Promise((resolve, reject) => {
      drive.files.get(
        {
          fileId: file.id,
          alt: 'media',
        },
        {
          responseType: 'arraybuffer',
        },
        (err: any, res: any) => {
          if (err) return reject(null)
          resolve(Buffer.from(res.data, 'binary'))
        },
      )
    })
  }
}

interface FileInfor {
  id: string
  url: string
}
