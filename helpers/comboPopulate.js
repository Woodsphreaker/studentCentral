const comboPopulate = (data, map) => {
  return data.reduce((acc, el) => {
    acc += `<option value="${el[map.value]}">${el[map.name]}</option>`
    return acc
  }, '')
}

export default comboPopulate
