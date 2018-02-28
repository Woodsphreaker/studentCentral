import { getData } from '../../Helpers/modules/async'
import customScroll from '../../Helpers/modules/customScrollbar'
import multimidiaEntry from '../../Helpers/modules/multimidia'
import { getState, getOption, stateOptions, getStateOptions } from '../../Helpers/modules/stateRoute'
import handlebars from 'handlebars'

export default (sysParam) => {
  const init = (data) => {
    Object.assign(sysParam, data)
    addActionsToObjects()
  }

  const addActionsToObjects = (el) => {
    $(document.body).on('click', '[data-type="course-start"]', (el) => {
      el.preventDefault()
      const element = el.currentTarget
      const courseID = element.getAttribute('data-course-id')
      const classID = element.getAttribute('data-class-id')
      const width = element.getAttribute('data-course-width')
      const height = element.getAttribute('data-course-height')
      const child = window.open(`../../../../aluno/conteudos/dependencia.asp?id_curso=${courseID}&id_turma=${classID}&Modulo=&Sessao=&CursoRevalidar=`, '', `width=${width},height=${height},status=no,menubar=no,scrollbars=yes,fullscreen=no,resizable=yes`)
      const [state, stateOptions] = [getState(), getStateOptions()]

      child.addEventListener('beforeunload', () => {
        sysParam.graphicsInfoBar.renderView({ state, stateOptions })
      }, false)
    })
  }

  const renderView = ({ state, stateOptions }) => {
    const urlProd = `${sysParam.urlRaiz}/modules/public/views/studentCentral/course-info-component.html`
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

    getViewData({ state, stateOptions })
      .then(results => {
        const { urlRaiz, companyID, clienteID, usuarioID } = sysParam
        const [ courseID ] = getOption(stateOptions)
        const url = `${urlRaiz}/portal/layout/${clienteID}/uploads/${companyID}/cursos/${courseID}`
        const { Curso_Nome, Curso_Tipo, capa, video, Curso_Descricao_Breve } = results[0]
        const multimidiaData = multimidiaEntry({ video: video, image: capa }, url)

        const source = {
          ...multimidiaData,
          title: Curso_Nome,
          description: Curso_Descricao_Breve,
          image: `${urlRaiz}/portal/layout/${clienteID}/uploads/${companyID}/cursos/Company_picture.jpg`,
          width: 1024,
          height: 768,
          views: true,
          comments: true,
          likes: true
        }

        const view = handlebars.compile(template)(source)
        $(`#${renderTo}, .${renderTo}`).find('[data-target="render"]').html(view)
        customScroll({ obj: 'descriptions', theme: 'dark-1', autoHide: false })
        startHelpersModules(source)
      })
      .catch(error => console.log(error))
  }

  const getViewData = ({ state, stateOptions }) => {
    const { urlRaiz, companyID, usuarioID } = sysParam
    const [courseID, classID] = getOption(stateOptions)
    const endpoint = `${urlRaiz}/app/StudentCentral/getCourseInfo?companyid=${companyID}&usuarioid=1&cursoID=${courseID}&turmaID=${classID}&option=Curso`
    return getData(endpoint)
  }

  const startHelpersModules = ({views, comments, likes}) => {
    const { urlRaiz, companyID, clienteID, usuarioID } = sysParam
    const [ courseID ] = getOption(stateOptions)

    if (likes) {
      appLikes.init({
        urlRaiz: urlRaiz,
        companyID: companyID,
        clienteID: clienteID,
        usuarioID: usuarioID,
        workspaceArea: 'cursos',
        workspaceAreaID: 2,
        workspaceAreaRegID: courseID
      })
    }
  }

  return {
    init,
    renderView,
    moduleName: sysParam.moduleName
  }
}
