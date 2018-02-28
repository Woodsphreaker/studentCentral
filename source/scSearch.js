import {getData} from '../../Helpers/modules/async'
import handlebars from 'handlebars'

export default (sysParam) => {
  const init = (data) => {
    Object.assign(sysParam, data)
    addActionsToObjects()
  }

  const addActionsToObjects = () => {}

  const routeAttributes = [
    {
      route: ['/', 'track-list'],
      title: 'pesquisar trilhas',
      placeholder: 'digite o nome ou mesmo parte da descrição da trilha',
      endpoint: ''
    },
    {
      route: ['track-info', 'courses-free-list'],
      title: 'pesquisar cursos',
      placeholder: 'digite o nome ou mesmo parte da desctrição do curso',
      endpoint: ''
    }
  ]

  const renderView = ({state, stateOptions}) => {
    const urlProd = `${sysParam.urlRaiz}/modules/public/views/studentCentral/search-component.html`
    getData(urlProd)
      .then(view => {
        const {renderTo} = sysParam
        const template = $('#item-template', view).html()
        $(`#${renderTo}, .${renderTo}`).html(view)
        viewContents({template, state, stateOptions})
      })
      .catch(error => console.log(error))
  }

  const viewContents = ({template, state, stateOptions}) => {
    const {renderTo} = sysParam
    const atributes = routeAttributes.find(({route}) => route.includes(state))
    const source = atributes
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
