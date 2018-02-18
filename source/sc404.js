import {getData} from '../../Helpers/modules/async'
import handlebars from 'handlebars'

export default (sysParam) => {
  const init = (data) => {
    Object.assign(sysParam, data)
    addActionsToObjects()
  }

  const addActionsToObjects = () => {
    $(document.body).on('click', '.back-button', () => {
      history.back()
    })
  }

  const renderView = () => {
    const urlProd = `${sysParam.urlRaiz}/modules/public/views/studentCentral/404.html`
    getData(urlProd)
      .then(view => {
        const {renderTo} = sysParam
        const template = $('#item-template', view).html()
        $(`#${renderTo}, .${renderTo}`).html(view)
        viewContents(template)
      })
      .catch(error => console.log(error))
  }

  const viewContents = (template) => {
    const {renderTo} = sysParam
    const source = {
      title: 'Ops !!!',
      error: 'Oh não, um erro aconteceu :-(',
      description: 'A página que você está procurando, não existe em nossos servidores.<br> Clique em voltar logo abaixo para retornar a página anterior a este erro.',
      button: 'Voltar'
    }
    const view = handlebars.compile(template)(source)
    $(`#${renderTo}, .${renderTo}`).find('[data-target="render"]').contents().remove()
    $(`#${renderTo}, .${renderTo}`).find('[data-target="render"]').html(view)
  }

  return {
    init,
    renderView,
    moduleName: sysParam.moduleName
  }
}
