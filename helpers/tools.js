const toArray = (str, to = ' ') => str.split(to)
const toNumber = (str = '') => Number(str)
const join = (arr, to = ' ') => arr.join(to)
const lcase = str => str.toLowerCase()
const ucase = str => str.toUpperCase()
const ucaseFirst = str => ucase(str.slice(0, 1))
const restOfString = str => str.slice(1)
const createWord = str => `${ucaseFirst(str)}${lcase(restOfString(str))}`
const capitalize = str => join(toArray(str).map(createWord))
const sort = (a, b) => a > b ? 1 : -1
const getTopEvents = (data, events = 10) => data.slice(0, events)
const formatDate = date => {
  return date
    ? new Date(Number(date.replace(/[^0-9]/g, ''))).toLocaleString('pt-BR')
    : ''
}
const getExtension = file => file.slice(file.lastIndexOf('.') + 1)
const random = (min = 0, max = 10) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export { toArray, join, lcase, ucase, ucaseFirst, restOfString, capitalize, sort, getTopEvents, formatDate, getExtension, random, toNumber }
