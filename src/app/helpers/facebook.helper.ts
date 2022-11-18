export const getAlbumId = (albumUrl: string) => {
  const regex =
    /^(?:(?:http|https):\/\/)?(?:www.|m.)?facebook.com\/media\/set\/\?set=a.?(?=\d.*)?([\w\-]*)&type=?(?=\d.*)?([\w\-]*)/
  if (regex.test(albumUrl)) {
    const albumId = albumUrl.split('=a.')[1].split('&')[0]
    return albumId
  }
}
