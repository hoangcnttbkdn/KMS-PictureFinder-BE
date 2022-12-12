import { createAxios, sleep } from '../utils'
import { ImageUrl } from '../typings'
import { logger } from '../../shared/providers'

export const getAlbumId = (albumUrl: string) => {
  const regex = /set=a.?(?=\d.*)?([\w\-]*)/
  const expression = albumUrl.match(regex)
  if (expression != null) {
    return expression[1]
  }
  return ''
}

/* c8 ignore start */
const axiosFB = createAxios({
  baseUrl: 'https://graph.facebook.com/v15.0/',
})

const fetchPhotoLinksFromCursor = async (
  albumId: string,
  accessToken: string,
  cookie: string,
  cursor: string = null,
) => {
  const { data, paging } = (await axiosFB.get(`${albumId}/photos`, {
    params: {
      fields: 'largest_image',
      limit: 100,
      access_token: accessToken,
      after: cursor,
    },
    headers: { cookie, 'Accept-Encoding': 'gzip,deflate,compress' },
  })) as any
  const arrayLink: Array<ImageUrl> = Array.from(data).map((item: any) => {
    return { id: item.id, url: item.largest_image.source }
  })
  return {
    arrayLink,
    nextCursor: paging?.next ? paging?.cursors?.after : null,
  }
}

export const fetchAllPhotoLinks = async (
  albumId: string,
  accessToken: string,
  cookie: string,
) => {
  let hasNextCursor = true
  let nextCursor = null
  const result: Array<ImageUrl> = []

  while (hasNextCursor) {
    try {
      const response = await fetchPhotoLinksFromCursor(
        albumId,
        accessToken,
        cookie,
        nextCursor,
      )
      result.push(...response.arrayLink)
      nextCursor = response.nextCursor
      hasNextCursor = nextCursor !== null
      await sleep(200)
    } catch (error) {
      logger.error(JSON.stringify(error))
      break
    }
  }
  return result
}
/* c8 ignore end */
