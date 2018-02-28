const startT = ({message = 'Aguarde'}) => {
  $.jLoader(message, false, 'abre')
}

const endT = () => {
  $.jLoader('', false, 'fecha')
}

export {startT, endT}
