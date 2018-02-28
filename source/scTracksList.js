import { getData } from '../../Helpers/modules/async'
import { setState } from '../../Helpers/modules/stateRoute'
import customScroll from '../../Helpers/modules/customScrollbar'
import handlebars from 'handlebars'

export default (sysParam) => {
  const init = (data) => {
    Object.assign(sysParam, data)
    addActionsToObjects()
  }

  const addActionsToObjects = () => {
    $(document.body).on('click', '[data-type="trackInfo"]', (el) => {
      const trackID = el.currentTarget.getAttribute('data-id')
      setState({ obj: null, stateName: `track-info/${trackID}` })
    })
  }

  const renderView = ({ state, stateOptions }) => {
    const urlProd = `${sysParam.urlRaiz}/modules/public/views/studentCentral/tracks-list-component.html`
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
        const view = handlebars.compile(template)({ 'tracks': results })
        $(`#${renderTo}, .${renderTo}`).find('[data-target="render"]').html(view)
        customScroll({ obj: 'descriptions', theme: 'dark-2', autoHide: false })
      })
      .catch(error => console.log(error))
  }

  const getViewData = ({ state, stateOptions }) => {
    const { urlRaiz, companyID, usuarioID } = sysParam
    const endpoint = `${urlRaiz}/app/StudentCentral/getTrackList?companyid=${companyID}&usuarioid=${usuarioID}&option=Trilhas_Lista`
    return getData(endpoint)
      .then(prepareData)
      .catch(error => console.log(error))
  }

  const prepareData = data => {
    const { companyID, clienteID, urlRaiz } = sysParam
    const results = data.reduce((acc, el) => {
      const fields = {
        trilhaID: el.trilhaID,
        trilha: el.trilha,
        desc_breve: el.desc_breve,
        capa: `${urlRaiz}/portal/layout/${clienteID}/uploads/${companyID}/sistema/trilhas/${el.trilhaID}/${el.capa}`,
        progresso: el.progresso,
        progresso_status: el.progresso_status,
        dependenciaID: el.dependenciaID
        // locked: true,
        // lock_title: 'Trilha indisponível',
        // lock_description: 'Para habilitar esta trilha, é necessário completar as seguintes trilhas:',
        // reason: el.dependencia
      }

      if (acc.has(el.trilhaID)) {
        // acc.get(el.trilhaID).lock_reasons.push({dependencia: el.dependencia})
      } else {
        acc.set(el.trilhaID, Object.assign({}, fields))
      }

      return acc
    }, new Map())

    return [...results.values()]

    // console.log(JSON.stringify(data))
    // const desc = ['xsmall', 'small', 'medium', 'large']
    // const pos = random(0, 3)
    // const locked = random(0, 1)
    // const percent = random(0, 100)
    // const status = percent => {
    //   return {
    //     0: `Não Iniciado`,
    //     100: `Finalizado`
    //   }[percent] || 'Em andamento'
    // }

    // const values = [{
    //   title: dummyData.xsmall,
    //   description: dummyData[desc[pos]],
    //   image: 'http://didaxis.dnsalias.com:82/unify_1_9_7/assets/img/clients2/ea-canada.png',
    //   percent: percent,
    //   status: status(percent),
    //   trackID: percent,
    //   locked: locked,
    //   lock_title: 'Trilha indisponível',
    //   lock_description: 'Para habilitar esta trilha, é necessário completar as seguintes trilhas:',
    //   lock_reasons: [
    //     { reason: 'TRILHA A' },
    //     { reason: 'TRILHA B' },
    //     { reason: 'TRILHA C' },
    //     { reason: 'TRILHA D' },
    //     { reason: 'TRILHA E' }
    //   ]
    // }]
  }

  return {
    init,
    renderView,
    moduleName: sysParam.moduleName
  }
}
