import { getData } from '../../Helpers/modules/async'
import { getOption } from '../../Helpers/modules/stateRoute'
import handlebars from 'handlebars'

export default (sysParam) => {
  const init = (data) => {
    Object.assign(sysParam, data)
    addActionsToObjects()
  }

  const addActionsToObjects = () => {
    $(document.body).on('click', '[data-type="midia-comments"]', (el) => {
      el.preventDefault()
      $('html, body').animate({
        scrollTop: document.querySelector('#container-comments').offsetTop - 200
      })
    })
  }

  const renderView = ({ state, stateOptions }) => {
    const urlProd = `${sysParam.urlRaiz}/modules/public/views/studentCentral/comments-component.html`
    getData(urlProd)
      .then(view => {
        const { renderTo } = sysParam
        const template = $('#item-template', view).html()
        $(`#${renderTo}, .${renderTo}`).html(view)
        viewContents({ template, state, stateOptions })
      })
      .catch(error => console.log(error))
  }

  const viewContents = ({ template, state, stateOptions }) => {
    const { renderTo, urlRaiz, companyID, clienteID, usuarioID } = sysParam
    const [ courseID ] = getOption(stateOptions)

    const view = handlebars.compile(template)()
    $(`#${renderTo}, .${renderTo}`).find('[data-target="render"]').contents().remove()
    $(`#${renderTo}, .${renderTo}`).find('[data-target="render"]').html(view)

    appComentarios.init({
      urlRaiz: urlRaiz,
      companyID: companyID,
      clienteID: clienteID,
      usuarioID: usuarioID,
      workspaceArea: 'cursos',
      workspaceAreaRegID: courseID,
      divMensagens: '#div_comentarios_1'
    })
  }

  return {
    init,
    renderView,
    moduleName: sysParam.moduleName
  }
}
