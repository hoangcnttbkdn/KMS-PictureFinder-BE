import { google } from 'googleapis'

import { TokenRepository } from '../repositories'
import { logger } from '../../shared/providers'
import { UpdateTokenDto } from '../dtos'

export class GoogleOAuthHelper {
  private tokenRepository: TokenRepository
  constructor() {
    this.tokenRepository = new TokenRepository()
  }

  private loadSavedCredentials = async () => {
    try {
      const token = await this.tokenRepository.findOne({ where: { id: 1 } })
      return google.auth.fromJSON({
        type: token.type,
        client_id: token.clientId,
        client_secret: token.clientSecret,
        refresh_token: token.refreshToken,
      })
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

  public saveCredentials = async (token: UpdateTokenDto) => {
    try {
      await this.tokenRepository.updateToken(1, token)
    } catch (err) {
      logger.error(err as any)
    }
  }
}
