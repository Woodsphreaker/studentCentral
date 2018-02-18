import {getData} from '../helpers/stateRoute'
import handlebars from 'handlebars'

export default (sysParam) => {
  const init = (data) => {
    Object.assign(sysParam, data)
    addActionsToObjects()
  }

  const addActionsToObjects = () => {}

  const renderView = () => {
    const urlProd = `${sysParam.urlRaiz}/modules/public/views/studentCentral/catalog-list-component.html`
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
      name: 'Catalogo de Cursos'
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
