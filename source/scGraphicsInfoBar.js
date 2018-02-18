import {getData} from '../../Helpers/modules/async'
import random from '../../Helpers/modules/randomNumber'
import handlebars from 'handlebars'

export default (sysParam) => {
  const init = (data) => {
    Object.assign(sysParam, data)
    addActionsToObjects()
  }

  const addActionsToObjects = () => {}

  const routeAtribbutes = {
    'track-info': {
      name: 'cursos',
      endpoint: ''
    },
    'track-list': {
      name: 'trilhas',
      endpoint: ''
    },
    'courses-free-list': {
      name: 'cursos livres',
      endpoint: ''
    }
  }

  const renderView = ({state, stateOptions}) => {
    const urlProd = `${sysParam.urlRaiz}/modules/public/views/studentCentral/graphics-info-bar-component.html`
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
    const complete = random(0, 10)
    const source = {
      from: complete,
      title: routeAtribbutes[state].name,
      to: 10,
      percent: (complete * 100) / 10
    }
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
