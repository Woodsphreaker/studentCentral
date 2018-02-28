import playerInfo from './playerInfo'

export default (data, url) => {
  const options = {
    video: () => ({ video: playerInfo(data.video).contents }),
    image: () => ({ image: `${url}/${data.image}` }),
    default: () => 'default'
  }

  const key = Object.keys(data)
    .filter(f => data[f])[0]

  return (options[key] || options['default'])()
}
