import {getData} from '../../Helpers/modules/async'
import playerInfo from '../../Helpers/modules/playerInfo'
import handlebars from 'handlebars'
import dummyData from './scDataSources'

export default (sysParam) => {
  const init = (data) => {
    Object.assign(sysParam, data)
    addActionsToObjects()
  }

  const addActionsToObjects = () => {}

  const renderView = ({state, stateOptions}) => {
    const urlProd = `${sysParam.urlRaiz}/modules/public/views/studentCentral/track-info-component.html`
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
    const source = {
      // image: 'http://lorempixel.com/975/615/',
      video: playerInfo('https://www.youtube.com/watch?v=SJj5p4Et61A').contents,
      title: dummyData.xsmall,
      description: dummyData.extra
    }
    const view = handlebars.compile(template)(source)
    $(`#${renderTo}, .${renderTo}`).find('[data-target="render"]').html(view)
    $('.descriptions').mCustomScrollbar({
      theme: 'dark-1',
      autoHideScrollbar: false
    })
  }

  return {
    init,
    renderView,
    moduleName: sysParam.moduleName
  }
}
