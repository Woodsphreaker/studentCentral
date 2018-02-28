import { getData } from '../../Helpers/modules/async'
import { setState, getState, getOption, getStateOptions } from '../../Helpers/modules/stateRoute'
import customScroll from '../../Helpers/modules/customScrollbar'
import handlebars from 'handlebars'

export default (sysParam) => {
  const init = (data) => {
    Object.assign(sysParam, data)
    addActionsToObjects()
  }

  const addActionsToObjects = () => {
    $(document.body).on('click', '[data-type="courseInfo"]', (el) => {
      el.preventDefault()
      const courseID = el.currentTarget.getAttribute('data-course-id')
      const classID = el.currentTarget.getAttribute('data-class-id')
      setState({ obj: null, stateName: `course-info/${courseID}/${classID}` })
    })

    $(document.body).on('click', '[data-type="start-course"]', (el) => {
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
        sysParam.coursesList.renderView({ state, stateOptions })
      }, false)
    })
  }

  const renderView = ({ state, stateOptions }) => {
    const urlProd = `${sysParam.urlRaiz}/modules/public/views/studentCentral/courses-list-component.html`
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
        const view = handlebars.compile(template)({ 'courses': results })
        $(`#${renderTo}, .${renderTo}`).find('[data-target="render"]').html(view)
        customScroll({ obj: 'descriptions', theme: 'dark-2', autoHide: false })
      })
  }

  const getViewData = ({ state, stateOptions }) => {
    const { urlRaiz, companyID, usuarioID } = sysParam
    const [ trackID ] = getOption(stateOptions)
    const endpoint = `${urlRaiz}/app/StudentCentral/getTrackCourseList?companyid=${companyID}&usuarioid=${usuarioID}&trackID=${trackID}&option=Trilha_Cursos`
    return getData(endpoint)
      .then(prepareData)
      .catch(error => console.log(error))
  }

  const prepareData = data => {
    const { companyID, clienteID, urlRaiz } = sysParam

    const results = data.reduce((acc, el) => {
      const fields = {
        courseID: el.cursoid,
        classID: el.turmaid,
        course_name: el.curso,
        short_description: el.curso_desc_breve,
        image: `${urlRaiz}/portal/layout/${clienteID}/uploads/${companyID}/${el.capa}`,
        progress: el.progresso,
        progress_status: el.cursoStatus,
        width: 1024,
        height: 768
        // dependenciaID: el.dependenciaID
        // locked: true
        // lock_title: 'Trilha indisponível',
        // lock_description: 'Para habilitar esta trilha, é necessário completar as seguintes trilhas:',
        // reason: el.dependencia
      }

      if (acc.has(el.cursoid)) {
        // acc.get(el.trilhaID).lock_reasons.push({dependencia: el.dependencia})
      } else {
        acc.set(el.cursoid, Object.assign({}, fields))
      }

      return acc
    }, new Map())

    return [...results.values()]
  }

  return {
    init,
    renderView,
    moduleName: sysParam.moduleName
  }
}

// const desc = ['xsmall', 'small', 'medium', 'large']
// const status = percent => {
//   return {
//     0: `Não Iniciado`,
//     100: `Finalizado`
//   }[percent] || 'Em andamento'
// }
// const viewData = [...Array(24).keys()]
//   .map(el => {
//     const percent = random(0, 100)
//     const pos = random(0, 3)
//     const locked = random(0, 1)
//     return {
//       title: dummyData.xsmall,
//       description: dummyData[desc[pos]],
//       image: 'http://didaxis.dnsalias.com:82/unify_1_9_7/assets/img/clients2/ea-canada.png',
//       percent: percent,
//       status: status(percent),
//       courseID: 199,
//       classID: 243,
//       locked: locked,
//       lock_title: 'Curso indisponível',
//       lock_description: 'Para habilitar este curso, é necessário completar os seguintes cursos:',
//       lock_reasons: [
//         { reason: 'CURSO A' },
//         { reason: 'CURSO B' },
//         { reason: 'CURSO C' },
//         { reason: 'CURSO D' },
//         { reason: 'CURSO E' },
//         { reason: 'CURSO F' },
//         { reason: 'CURSO G' }
//       ]
//     }
//   })
