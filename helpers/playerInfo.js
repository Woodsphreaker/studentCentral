const playerInfo = link => {
  const players = ['youtube', 'vimeo']

  const getPlayerName = (listPlayes, link) => {
    return listPlayes.reduce((acc, el) => {
      link.includes(el)
        ? acc = el
        : acc
      return acc
    }, '')
  }

  const getPlayerURL = (player, videoID) => {
    return {
      youtube: `http://www.youtube.com/embed/${videoID}`,
      vimeo: `https://player.vimeo.com/video/${videoID}`
    }[player]
  }

  const getYoutubeID = link => {
    return link.lastIndexOf('watch?v=') > -1
      ? link.slice(link.lastIndexOf('v=') + 2)
      : 0
  }

  const getVimeoID = link => {
    return link.lastIndexOf('vimeo.com/') > -1
      ? link.slice(link.lastIndexOf('vimeo.com/') + 10)
      : 0
  }

  const getVideoID = (link, player) => {
    return {
      youtube: getYoutubeID,
      vimeo: getVimeoID
    }[player](link)
  }

  const playerName = getPlayerName(players, link)
  if (!playerName) return { error: true, errorType: 'Player não idenficado' }

  const videoID = getVideoID(link, playerName)
  if (!videoID) return { error: true, errorType: 'VideoID não informado ou está em um formato incorreto' }

  const videoURL = getPlayerURL(playerName, videoID)
  if (!videoURL) return { error: true, errorType: 'URL não está em um formato esperado' }

  return { error: false, contents: videoURL }
}

export default playerInfo
