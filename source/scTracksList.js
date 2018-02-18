import {getData} from '../helpers/async'
import random from '../helpers/randomNumber'
import {setState} from '../helpers/stateRoute'
import handlebars from 'handlebars'

export default (sysParam) => {
  const init = (data) => {
    Object.assign(sysParam, data)
    addActionsToObjects()
  }

  const addActionsToObjects = () => {
    $(document.body).on('click', '[data-type="trackInfo"]', (el) => {
      const trackID = el.currentTarget.getAttribute('data-id')
      setState({obj: null, stateName: `track-info/${trackID}`})
    })
  }

  const renderView = () => {
    const urlProd = `${sysParam.urlRaiz}/modules/public/views/studentCentral/tracks-list-component.html`
    getData(urlProd)
      .then(view => {
        const {renderTo} = sysParam
        const template = $('#item-template', view).html()
        $(`#${renderTo}, .${renderTo}`).html(view)
        viewContents(template)
      })
      .catch(error => console.log(error))
  }

  const viewContents = template => {
    const {renderTo} = sysParam
    const status = percent => {
      return {
        0: `Não Iniciado`,
        100: `Finalizado`
      }[percent] || 'Em andamento'
    }
    const viewData = [...Array(24).keys()]
      .map(el => {
        const percent = random(0, 100)
        return {
          title: 'Lorem Ipsum Dolor',
          description: 'Lorem, Lorem',
          image: 'http://didaxis.dnsalias.com:82/unify_1_9_7/assets/img/clients2/ea-canada.png',
          percent: percent,
          status: status(percent),
          trackID: percent
        }
      })
    const view = handlebars.compile(template)({'tracks': viewData})
    $(`#${renderTo}, .${renderTo}`).find('[data-target="render"]').contents().remove()
    $(`#${renderTo}, .${renderTo}`).find('[data-target="render"]').html(view)
  }

  return {
    init,
    renderView,
    moduleName: sysParam.moduleName
  }
}
