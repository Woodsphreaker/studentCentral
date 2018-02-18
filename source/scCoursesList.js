import {getData} from '../helpers/async'
import random from '../helpers/randomNumber'
import {setState} from '../helpers/stateRoute'
import handlebars from 'handlebars'
import dummyData from './scDataSources'

export default (sysParam) => {
  const init = (data) => {
    Object.assign(sysParam, data)
    addActionsToObjects()
  }

  const addActionsToObjects = () => {
    $(document.body).on('click', '[data-type="courseInfo"]', (el) => {
      const courseID = el.currentTarget.getAttribute('data-id')
      setState({obj: null, stateName: `course-info/${courseID}`})
    })
  }

  const renderView = () => {
    const urlProd = `${sysParam.urlRaiz}/modules/public/views/studentCentral/courses-list-component.html`
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
          title: dummyData.xsmall,
          description: dummyData.medium,
          image: 'http://didaxis.dnsalias.com:82/unify_1_9_7/assets/img/clients2/ea-canada.png',
          percent: percent,
          status: status(percent),
          courseID: percent
        }
      })
    const view = handlebars.compile(template)({'courses': viewData})
    $(`#${renderTo}, .${renderTo}`).find('[data-target="render"]').contents().remove()
    $(`#${renderTo}, .${renderTo}`).find('[data-target="render"]').html(view)
  }

  return {
    init,
    renderView,
    moduleName: sysParam.moduleName
  }
}
