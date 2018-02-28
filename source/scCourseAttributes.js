import { getData } from '../../Helpers/modules/async'
import serviceIcons from '../../Helpers/modules/iconsByService'
import { getExtension, formatDate, lcase, toNumber } from '../../Helpers/modules/tools'
import { getOption } from '../../Helpers/modules/stateRoute'
import handlebars from 'handlebars'

export default (sysParam) => {
  const init = (data) => {
    Object.assign(sysParam, data)
    addActionsToObjects()
  }

  const addActionsToObjects = () => { }

  const renderView = ({ state, stateOptions }) => {
    const urlProd = `${sysParam.urlRaiz}/modules/public/views/studentCentral/course-attributes-component.html`
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

    getViewData({stateOptions})
      .then((results) => {
        const [info, modules, resources] = results
        const { Curso_Descricao_Completa, Curso_Pre_Requisitos } = Object.assign({}, ...info)

        const source = {
          description: Curso_Descricao_Completa,
          requirements: Curso_Pre_Requisitos,
          sessions: processModules(modules),
          resources: processResources(resources)
        }
        const view = handlebars.compile(template)(source)
        $(`#${renderTo}, .${renderTo}`).find('[data-target="render"]').html(view)
        helpersComponents({ stateOptions })
      })
      .catch(error => console.log(error))
  }

  const getViewData = ({ stateOptions }) => {
    const requests = ['info', 'modules', 'resources']
    return Promise.all(
      requests.map(endpoint => {
        return getData(endpoints({ endpoint, stateOptions }))
      })
    )
  }

  const processModules = data => {
    const results = data
      .reduce((acc, {ModuloID: moduleID, Modulo_Nome: module, SessaoID: sessionID, Sessao_Nome: session, Sessao_Tipo: sessionType, Acessou: accessed}) => {
        if (acc.has(moduleID)) {
          acc.get(moduleID).sessions.push({
            sessionID,
            session,
            sessionType,
            accessed: toNumber(accessed),
            iconByType: serviceIcons(lcase(sessionType))
          })
        } else {
          acc.set(moduleID, {
            moduleID,
            module,
            sessions: [{
              sessionID,
              session,
              sessionType,
              accessed: toNumber(accessed),
              iconByType: serviceIcons(lcase(sessionType))
            }]
          })
        }
        return acc
      }, new Map())

    return [...results.values()]
  }

  const processResources = data => {
    const { urlRaiz, companyID, clienteID } = sysParam
    return data
      .map(({ArquivioID: fileID, Arquivo_Nome: fileName, Arquivo_Comentario: fileComments, Arquivo_Data: fileDate}) => {
        return {
          flag: serviceIcons(getExtension(fileName)),
          name: fileName,
          path: `${urlRaiz}/portal/layout/${clienteID}/uploads/${companyID}/cursos/referencias/${fileName}`,
          type: getExtension(fileName),
          size: '12 KB',
          date: formatDate(fileDate)
        }
      })
  }

  const endpoints = ({endpoint, stateOptions}) => {
    const { urlRaiz, companyID, usuarioID } = sysParam
    const [courseID, classID] = getOption(stateOptions)
    const info = () => `${urlRaiz}/app/StudentCentral/getCourseInfo?companyid=${companyID}&usuarioid=1&cursoID=${courseID}&turmaID=${classID}&option=curso`
    const modules = () => `${urlRaiz}/app/StudentCentral/getCourseModules?companyid=${companyID}&usuarioid=1&cursoID=${courseID}&turmaID=${classID}&option=modulos`
    const resources = () => `${urlRaiz}/app/StudentCentral/getCourseResources?companyid=${companyID}&usuarioid=1&cursoID=${courseID}&turmaID=${classID}&option=arquivos`

    return {
      info,
      modules,
      resources
    }[endpoint]()
  }

  const helpersComponents = ({ stateOptions }) => {
    appDataTables.montaTabela({
      obj: '#course_resources_list',
      order: [1, 'desc'],
      collumnOrder: [0],
      buttons: ['excel']
    })

    appReader.init({
      el: '.openReader'
    })
  }

  return {
    init,
    renderView,
    moduleName: sysParam.moduleName
  }
}
