import 'dotenv/config'
import request from 'supertest'
import path from 'path'

import { appProvider, databaseProvider } from '../../../src/shared/providers'
import {} from '../../__mock__'

beforeAll(async () => {
  await databaseProvider.initialize()
})

describe('Test facebook', () => {
  const server = request(appProvider.app)

  it('image greater than 5MB', async () => {
    const res = await server
      .post('/api/facebook')
      .attach(
        'targetImage',
        path.resolve(
          __dirname,
          '..',
          '..',
          '__mock__',
          'files',
          'large-image.jpg',
        ),
      )
      .field('accessToken', 'abc')
      .field('cookie', 'abc')
      .field(
        'albumUrl',
        'https://www.facebook.com/media/set/?set=a.104337903263533&type=3',
      )
    expect(res.body).toEqual({ message: 'File too large' })
  })

  it('missing target image', async () => {
    const res = await server
      .post('/api/facebook')
      .field('accessToken', 'abc')
      .field('cookie', 'abc')
      .field(
        'albumUrl',
        'https://www.facebook.com/media/set/?set=a.104337903263533&type=3',
      )
    expect(res.body).toEqual({ message: 'Target image is required' })
  })

  it('missing access token', async () => {
    const res = await server
      .post('/api/facebook')
      .attach(
        'targetImage',
        path.resolve(__dirname, '..', '..', '__mock__', 'files', 'thanh.jpg'),
      )
      .field('cookie', 'abc')
      .field(
        'albumUrl',
        'https://www.facebook.com/media/set/?set=a.104337903263533&type=3',
      )
    expect(res.body).toEqual({ message: 'Access token and cookie is required' })
  })

  it('missing cookie', async () => {
    const res = await server
      .post('/api/facebook')
      .attach(
        'targetImage',
        path.resolve(__dirname, '..', '..', '__mock__', 'files', 'thanh.jpg'),
      )
      .field('accessToken', 'abc')
      .field(
        'albumUrl',
        'https://www.facebook.com/media/set/?set=a.104337903263533&type=3',
      )
    expect(res.body).toEqual({ message: 'Access token and cookie is required' })
  })

  it('missing album url', async () => {
    const res = await server
      .post('/api/facebook')
      .attach(
        'targetImage',
        path.resolve(__dirname, '..', '..', '__mock__', 'files', 'thanh.jpg'),
      )
      .field('accessToken', 'abc')
      .field('cookie', 'abc')
    expect(res.body).toEqual({ message: 'Facebook album url is invalid' })
  })

  it('email invalid', async () => {
    const res = await server
      .post('/api/facebook')
      .attach(
        'targetImage',
        path.resolve(__dirname, '..', '..', '__mock__', 'files', 'thanh.jpg'),
      )
      .field('accessToken', 'abc')
      .field('cookie', 'abc')
      .field(
        'albumUrl',
        'https://www.facebook.com/media/set/?set=a.104337903263533&type=3',
      )
      .field('email', '19tclcdt4')
    expect(res.body).toEqual({ message: 'Email is invalid' })
  })
})
