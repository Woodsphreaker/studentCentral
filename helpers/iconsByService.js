export default type => {
  const elements = {
    video: 'fa fa-video-camera color-default',
    text: 'fa fa-file-text-o color-default',
    test: 'fa fa-pencil-square-o color-default',
    sheet: 'fa fa-file-excel-o',
    doc: 'fa fa-file-word-o',
    pres: 'fa fa-file-powerpoint-o',
    pdf: 'fa fa-file-pdf-o',
    survey: 'fa fa-question-circle',
    img: 'fa fa-file-image-o',
    audio: 'fa fa-file-audio-o',
    other: 'fa fa-file-text-o color-default'
  }

  const service = {
    xls: elements['sheet'],
    xlsx: elements['sheet'],
    doc: elements['doc'],
    docx: elements['doc'],
    ppt: elements['pres'],
    pptx: elements['pres'],
    txt: elements['text'],
    pdf: elements['pdf'],
    prova: elements['test'],
    pesquisa: elements['survey'],
    vimeo: elements['video'],
    other: elements['other']

  }
  return (service[type.toLowerCase()] || service['other'])
}
