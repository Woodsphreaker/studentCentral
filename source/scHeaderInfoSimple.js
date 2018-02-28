import { getData } from '../../Helpers/modules/async'
import handlebars from 'handlebars'

export default (sysParam) => {
  const init = (data) => {
    Object.assign(sysParam, data)
    addActionsToObjects()
  }

  const addActionsToObjects = () => { }

  const renderView = () => {
    const urlProd = `${sysParam.urlRaiz}/modules/public/views/studentCentral/header-info-simple-component.html`
    getData(urlProd)
      .then(view => {
        const { renderTo } = sysParam
        const template = $('#item-template', view).html()
        $(`#${renderTo}, .${renderTo}`).html(view)
        viewContents(template)
      })
      .catch(error => console.log(error))
  }

  const viewContents = template => {
    const { renderTo } = sysParam
    const source = {
      title: 'Central do Aluno'
    }
    const view = handlebars.compile(template)(source)
    const target = $(`#${renderTo}, .${renderTo}`)
    target.find('[data-target="render"]').html(view)
  }

  return {
    init,
    renderView,
    moduleName: sysParam.moduleName
  }
}
