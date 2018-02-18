
const makeRows = (data, processHeader = false) => {
  const dataType = processHeader
    ? Object.keys(data[0])
    : data

  const rows = dataType.reduce((acc, row) => {
    acc += processHeader
      ? `\n    <td>${row}</td>`
      : `\n  <tr>${makeCols(row)}\n  </tr>`
    return acc
  }, '')

  return processHeader ? `  <tr>${rows}\n  </tr>` : rows
}

const makeCols = (data) => {
  const cols = Object.keys(data)
    .reduce((acc, col) => {
      acc += `\n    <td style="white-space:nowrap">${data[col] === null ? '' : data[col]}</td>`
      return acc
    }, '')

  return cols
}

const makeHeader = (data) => {
  return makeRows(data, true)
}

const makeBody = (data) => {
  return makeRows(data)
}

const getTemplate = (type, data, tableID) => {
  const tableDefault = () => `<table class="table table-striped" id="${tableID}">\n<thead>\n${makeHeader(data)}\n</thead>\n<tbody>${makeBody(data)}\n</tbody>\n</table>`
  return {
    tableDefault
  }[type]()
}

const makeTable = ({ template = 'tableDefault', data = {}, tableID }) => {
  return getTemplate(template, data, tableID)
}

export default makeTable
