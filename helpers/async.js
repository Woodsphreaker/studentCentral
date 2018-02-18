const postData = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    $.post(url, $.param(data))
      .done((data) => resolve(data))
      .fail((error) => reject(error))
  })
}

const getData = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    $.get(url, $.param(data))
      .done((data) => resolve(data))
      .fail((error) => reject(error))
  })
}

export {postData, getData}
