/* eslint-disable @typescript-eslint/ban-types */
import { JSONClient } from 'google-auth-library/build/src/auth/googleauth'
import { GetFileList } from 'google-drive-getfilelist'
import { GoogleOAuthHelper } from './gg-oauth.helper'
import { ImageUrl } from '../typings'

export class GoogleDriveHelper {
  private googleOAuthHelper: GoogleOAuthHelper

  constructor() {
    this.googleOAuthHelper = new GoogleOAuthHelper()
  }

  public recognizeWithGGDrive = async (
    folderUrl: string,
  ): Promise<ImageUrl[]> => {
    const folderId = this.getGGDriveFolderId(folderUrl)
    if (!folderId) {
      throw { message: 'This folderUrl is not contain folderId' }
    }

    const auth = await this.googleOAuthHelper.authorize()

    const files: ImageUrl[] = await this.getGoogleImgLink(folderId, auth)
    return files
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
  ): Promise<ImageUrl[]> => {
    return new Promise((resolve, reject) => {
      const resource = {
        auth,
        id: folderId,
        fields: 'files(id,name,thumbnailLink)',
      }
      GetFileList(resource, (err: any, res: any) => {
        if (err) return reject([])
        const files = res.fileList.flatMap(({ files }) => files)
        const fileInfors: ImageUrl[] = files.map((f: any): ImageUrl => {
          return {
            id: f.id || '',
            name: f.name || '',
            url: f.thumbnailLink || '',
          }
        })
        resolve(fileInfors)
      })
    })
  }
}
