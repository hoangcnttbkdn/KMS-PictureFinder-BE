import { getAlbumId } from '../../../src/app/helpers/facebook.helper'

describe('Test facebook helper', () => {
  describe('Test get album id', () => {
    it('success', () => {
      expect(
        getAlbumId(
          'https://www.facebook.com/media/set/?set=a.104337903263533&type=3',
        ),
      ).toEqual('104337903263533')
    })

    it('fail', () => {
      expect(getAlbumId('https://www.facebook.com/jthanh8144')).toEqual('')
    })
  })
})
