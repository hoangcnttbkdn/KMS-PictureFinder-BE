import request from 'supertest'
import { StatusCodes } from 'http-status-codes'

import { appProvider } from '../../../src/shared/providers'

describe('Test home', () => {
  const server = request(appProvider.app)

  it('success', async () => {
    const res = await server.get(`/`)
    expect(res.statusCode).toBe(StatusCodes.MOVED_TEMPORARILY)
  })
})
