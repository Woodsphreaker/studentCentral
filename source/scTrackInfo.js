import { getData } from '../../Helpers/modules/async'
import multimidiaEntry from '../../Helpers/modules/multimidia'
import customScroll from '../../Helpers/modules/customScrollbar'
import { getOption } from '../../Helpers/modules/stateRoute'
import handlebars from 'handlebars'

export default (sysParam) => {
  const init = (data) => {
    Object.assign(sysParam, data)
    addActionsToObjects()
  }

  const addActionsToObjects = () => { }

  const renderView = ({ state, stateOptions }) => {
    const urlProd = `${sysParam.urlRaiz}/modules/public/views/studentCentral/track-info-component.html`
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
    const { renderTo } = sysParam
    const { companyID, clienteID, urlRaiz } = sysParam
    getViewData({ state, stateOptions })
      .then(results => {
        const { trilhaID, trilha, capa, video, descricao_breve } = results[0]
        const url = `${urlRaiz}/portal/layout/${clienteID}/uploads/${companyID}/sistema/trilhas/${trilhaID}`
        const multimidiaData = multimidiaEntry({ video: video, image: capa }, url)

        const source = {
          ...multimidiaData,
          title: trilha,
          description: descricao_breve
        }

        const view = handlebars.compile(template)(source)
        $(`#${renderTo}, .${renderTo}`).find('[data-target="render"]').html(view)
        customScroll({ obj: 'descriptions', theme: 'dark-1', autoHide: false })
      })
      .catch(error => console.log(error))
  }

  const getViewData = ({ state, stateOptions }) => {
    const { urlRaiz, companyID, usuarioID } = sysParam
    const [ trackID ] = getOption(stateOptions)
    const endpoint = `${urlRaiz}/app/StudentCentral/getTrackInfo?companyid=${companyID}&usuarioid=${usuarioID}&trackID=${trackID}&option=Trilha_Informacao`
    return getData(endpoint)
  }

  return {
    init,
    renderView,
    moduleName: sysParam.moduleName
  }
}
