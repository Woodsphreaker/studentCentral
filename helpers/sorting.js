const sorting = (obj, order = 'asc', field) => {
  const asc = () => obj.sort((a, b) =>
    ((a = field ? a[field].toUpperCase() : a) > (b = field ? b[field].toUpperCase() : b) ? 1 : -1)
  )
  const desc = () => asc().reverse()

  const sort = {
    asc,
    desc
  }

  return sort[order]()
}

export default sorting
