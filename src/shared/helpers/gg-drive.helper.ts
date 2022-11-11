import { GetFileList } from 'google-drive-getfilelist'
import { google } from 'googleapis'
import { logger } from '../providers/'

export class GoogleDriveHelper {
  private GG_API_KEY: string = process.env.GG_API_KEY

  public downloadFolder = (folderId: string) => {
    const drive = google.drive({
      version: 'v3',
      auth: this.GG_API_KEY,
    })

    const resource = {
      auth: this.GG_API_KEY,
      id: folderId,
      fields: 'files(id)',
    }

    GetFileList(resource, (err: any, res: any) => {
      if (err) {
        logger.error(err)
        return
      }
      const files = res.fileList.flatMap(({ files }) => files)

      files.forEach(async (f: any) => {
        try {
          const file = await drive.files.get(
            {
              fileId: f.id,
              alt: 'media',
            },
            {
              responseType: 'arraybuffer',
            },
            (err, res: any) => {
              if (!res) throw err
              const dataBuffer = Buffer.from(res.data)
              console.log(dataBuffer.length)
            },
          )
        } catch (err) {
          console.log(`Error file id ${f.id}`)
        }
      })
    })
    return []
  }
}
