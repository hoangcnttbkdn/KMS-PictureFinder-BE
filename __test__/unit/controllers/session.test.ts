import 'dotenv/config'
import request from 'supertest'

import { appProvider, databaseProvider } from '../../../src/shared/providers'
import { objectSession, objectSessionFail, sessionImages } from '../../__mock__'

beforeAll(async () => {
  await databaseProvider.initialize()
})

describe('Test session', () => {
  const server = request(appProvider.app)

  describe('get info of a session', () => {
    it('success', async () => {
      const res = await server.get(`/api/sessions/${1}`)
      expect(res.body).toEqual(objectSession)
    })
    it('fail', async () => {
      const res = await server.get(`/api/sessions/abc`)
      expect(res.body).toEqual(objectSessionFail)
    })
  })

  describe('get images match face of a session', () => {
    it('success', async () => {
      const res = await server.get(`/api/sessions/${1}/images`)
      expect(res.body).toEqual(sessionImages)
    })
    it('fail', async () => {
      const res = await server.get(`/api/sessions/abc/images`)
      expect(res.body).toEqual(objectSessionFail)
    })
  })
})
