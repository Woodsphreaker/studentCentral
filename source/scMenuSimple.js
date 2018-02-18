import {getData} from '../helpers/async'
import {getState, setState} from '../helpers/stateRoute'

export default (sysParam) => {
  const init = (data) => {
    Object.assign(sysParam, data)
    addActionsToObjects()
  }

  const addActionsToObjects = () => {
    $(document.body).on('click', '[role="menu"]', (el) => {
      el.preventDefault()
      $('[role="menu"]').removeClass('active')
      $(el.currentTarget).addClass('active')
      const route = $(el.currentTarget).attr('data-route')
      const options = ''
      setState({stateName: `${route}${options}`})
    })
  }

  const setMenuActive = () => {
    const state = getState() === '/' ? 'track-list' : getState()
    $('[role="menu"]').removeClass('active')
    $(`[role="menu"][data-route="${state}"]`).addClass('active')
  }

  const renderView = () => {
    const urlProd = `${sysParam.urlRaiz}/modules/public/views/studentCentral/menu-simple-component.html`
    getData(urlProd)
      .then(view => {
        const {renderTo} = sysParam
        $(`#${renderTo}, .${renderTo}`).html(view)
        setMenuActive()
      })
      .catch(error => console.log(error))
  }

  return {
    init,
    renderView,
    moduleName: sysParam.moduleName
  }
}
