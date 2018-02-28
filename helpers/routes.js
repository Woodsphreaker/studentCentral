import { replaceState, getState, getStateOptions } from './stateRoute'
import { startT, endT } from './transitions'

export default (routesConfig, listModules, modulesMethods, { el }) => {
  const init = () => {
    startListener()
    getRoute()
  }

  const startListener = () => {
    window.addEventListener('popstate', () => {
      getRoute()
    })
  }

  const findRoute = (routeList, routeToFind) => {
    return routeList.find(({ route }) => route.includes(routeToFind))
  }

  const getElementsToCreate = (modulesRoute, modulesList) => {
    return [...new Set(modulesRoute.map(m => modulesList.find(({ name }) => name === m).el))]
  }

  const loadRouteModules = routeModules => {
    const state = getState()
    const stateOptions = getStateOptions()
    routeModules
      .forEach(module => {
        modulesMethods[module].renderView({ state, stateOptions })
      })
    $(`#${el}, .${el}`).fadeIn(500, () => {
      endT()
      $(`html, body`)
        .animate({ scrollTop: 0 }, 1500)
    })
  }

  const createDomElements = elementsToCreate => {
    elementsToCreate.forEach(domElement => {
      $(`#${el}, .${el}`)
        .append(`<div id="${domElement}"></div>`)
    })
  }

  const clearElements = callback => {
    const domElement = $(`#${el}, .${el}`)
    startT({ message: 'Carregando módulos, aguarde ...' })
    $(`#${el}, .${el}`).fadeOut(500, () => {
      domElement.contents().remove()
      callback()
    })
  }

  const loadRoute = route => {
    const { loadModules } = route
    const elementsToCreate = getElementsToCreate(loadModules, listModules)
    clearElements(() => {
      createDomElements(elementsToCreate)
      loadRouteModules(loadModules)
    })
  }

  const getRoute = () => {
    const state = getState()
    const route = findRoute(routesConfig, state)

    if (!route) {
      replaceState({ stateName: '404' })
      return false
    }

    loadRoute(route)
  }

  return {
    init
  }
}
