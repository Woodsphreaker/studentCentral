import { getData } from '../../Helpers/modules/async'
import playerInfo from '../../Helpers/modules/playerInfo'
import customScroll from '../../Helpers/modules/customScrollbar'
import handlebars from 'handlebars'
import dummyData from './scDataSources'

export default (sysParam) => {
  const init = (data) => {
    Object.assign(sysParam, data)
    addActionsToObjects()
  }

  const addActionsToObjects = () => { }

  const routeAttributes = [
    {
      route: ['track-info'],
      // image: 'http://lorempixel.com/975/615/',
      video: playerInfo('https://www.youtube.com/watch?v=-8TIEakik6U').contents,
      title: dummyData.xsmall,
      description: dummyData.extra
    },
    {
      route: ['course-info'],
      // image: 'http://lorempixel.com/975/615/',
      video: playerInfo('https://www.youtube.com/watch?v=4HuAnM6b2d8').contents,
      title: dummyData.xsmall,
      description: dummyData.extra
    }
  ]

  const renderView = ({ state, stateOptions }) => {
    const urlProd = `${sysParam.urlRaiz}/modules/public/views/studentCentral/header-info-complete-component.html`
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
    const atributes = routeAttributes.find(({ route }) => route.includes(state))
    const source = atributes
    const view = handlebars.compile(template)(source)
    $(`#${renderTo}, .${renderTo}`).find('[data-target="render"]').html(view)
    customScroll({ obj: 'descriptions', theme: 'dark-1', autoHide: false })
  }

  return {
    init,
    renderView,
    moduleName: sysParam.moduleName
  }
}
