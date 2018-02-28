import { getData } from '../../Helpers/modules/async'
import handlebars from 'handlebars'

export default (sysParam) => {
  const init = (data) => {
    Object.assign(sysParam, data)
    addActionsToObjects()
  }

  const addActionsToObjects = () => { }

  const getRouteAttributes = ({ state, stateOptions }) => {
    const { companyID, usuarioID, urlRaiz } = sysParam
    const routes = [
      {
        route: ['/', 'track-list'],
        full_description: true,
        title: 'trilhas',
        endpoint: `${urlRaiz}/app/StudentCentral/getGeneralProgress?companyID=${companyID}&usuarioID=${usuarioID}&option=Trilhas_Progresso_Geral`
      },
      {
        route: ['track-info'],
        full_description: true,
        title: 'cursos',
        endpoint: `${urlRaiz}/app/StudentCentral/getTrackProgress?companyID=${companyID}&usuarioID=${usuarioID}&trackid=${stateOptions.slice(1)}&option=Trilha_Progresso`
      },
      {
        route: ['course-info'],
        full_description: false,
        title: 'curso',
        endpoint: ''
      },
      {
        route: ['courses-free-list'],
        full_description: true,
        title: 'cursos livres',
        endpoint: ''
      }
    ]
    return routes.find(({ route }) => route.includes(state))
  }

  const renderView = ({ state, stateOptions }) => {
    const { urlRaiz } = sysParam
    const urlView = `${urlRaiz}/modules/public/views/studentCentral/graphics-info-bar-component.html`
    getData(urlView)
      .then(view => {
        const { renderTo } = sysParam
        const template = $('#item-template', view).html()
        $(`#${renderTo}, .${renderTo}`).html(view)
        viewContents({ template, state, stateOptions })
      })
      .catch(error => console.log(error))
  }

  const getViewData = ({ state, stateOptions }) => {
    const { full_description, title, endpoint } = getRouteAttributes({ state, stateOptions })
    return getData(endpoint)
      .then(data => Object.assign({}, ...data, { full_description, title }))
      .catch(error => console.log(error))
  }

  const viewContents = ({ template, state, stateOptions }) => {
    const { renderTo } = sysParam
    getViewData({ state, stateOptions })
      .then(results => {
        const view = handlebars.compile(template)(results)
        const target = $(`#${renderTo}, .${renderTo}`)
        target.find('[data-target="render"]').html(view)
      })
      .catch(error => console.log(error))
  }

  return {
    init,
    renderView,
    moduleName: sysParam.moduleName
  }
}
