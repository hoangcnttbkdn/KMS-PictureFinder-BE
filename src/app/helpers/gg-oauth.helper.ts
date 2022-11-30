/* eslint-disable @typescript-eslint/ban-types */
import path from 'path'
import * as fs from 'fs/promises'
import { google } from 'googleapis'

export class GoogleOAuthHelper {
  private TOKEN_PATH = path.join(process.cwd(), 'gg-token.json')

  private loadSavedCredentials = async () => {
    try {
      const content = await fs.readFile(this.TOKEN_PATH)
      const credentials = JSON.parse(content.toString())
      return google.auth.fromJSON(credentials)
    } catch (err) {
      return null
    }
  }

  public authorize = async () => {
    const auth = await this.loadSavedCredentials()
    if (auth) {
      return auth
    }
  }

  public saveCredentials = async (auth) => {
    try {
      const payload = JSON.stringify({
        type: auth.type,
        client_id: auth.client_id,
        client_secret: auth.client_secret,
        refresh_token: auth.refresh_token,
      })
      await fs.writeFile(this.TOKEN_PATH, payload, { flag: 'w' })
    } catch (err) {
      console.log(err)
    }
  }
}
