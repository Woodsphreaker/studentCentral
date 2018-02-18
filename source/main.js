import menuSimple from './scMenuSimple'
import graphicsInfoBar from './scGraphicsInfoBar'
import tracksList from './scTracksList'
import trackInfo from './scTrackInfo'
import sysParam from './scSysParam'
import headerInfo from './scHeaderInfo'
import coursesList from './scCoursesList'
import coursesListTable from './scCourseListTable'
import catalogList from './scCatalogList'
import error from './sc404'
import routes from './scRoutes'

const centralStudentAPI = () => {
  const init = data => {
    Object.assign(sysParam, data)
    configModules()
  }

  const configModules = () => {
    const listModules = [
      {moduleInstace: headerInfo, el: 'headerInfo', name: 'headerInfo'},
      {moduleInstace: menuSimple, el: 'menuSimple', name: 'menuSimple'},
      {moduleInstace: graphicsInfoBar, el: 'graphicsInfoBar', name: 'graphicsInfoBar'},
      {moduleInstace: tracksList, el: 'main', name: 'tracksList'},
      {moduleInstace: trackInfo, el: 'trackInfo', name: 'trackInfo'},
      {moduleInstace: coursesList, el: 'main', name: 'coursesList'},
      {moduleInstace: coursesListTable, el: 'main', name: 'coursesListTable'},
      {moduleInstace: catalogList, el: 'main', name: 'catalogList'},
      {moduleInstace: error, el: 'main', name: 'error'}
    ]

    const routeConfig = [
      {
        route: ['/', 'track-list'],
        loadModules: ['headerInfo', 'menuSimple', 'graphicsInfoBar', 'tracksList']
      },
      {
        route: ['track-info'],
        loadModules: ['trackInfo', 'menuSimple', 'graphicsInfoBar', 'coursesList']
      },
      {
        route: ['courses-list-table'],
        loadModules: ['headerInfo', 'menuSimple', 'coursesListTable']
      },
      {
        route: ['courses-free-list'],
        loadModules: ['headerInfo', 'menuSimple', 'graphicsInfoBar', 'coursesList']
      },
      {
        route: ['finished-list'],
        loadModules: ['headerInfo', 'menuSimple']
      },
      {
        route: ['catalog-list'],
        loadModules: ['headerInfo', 'menuSimple', 'catalogList']
      },
      {
        route: ['404'],
        loadModules: ['error']
      }
    ]

    const modulesToLoad = listModules
      .map(({ moduleInstace, el, name }) => moduleInstace(Object.assign({}, sysParam, {renderTo: el, moduleName: name})))

    const modulesMethods = modulesToLoad
      .reduce((acc, { renderView, moduleName }) => {
        acc[moduleName] = {
          renderView: renderView
        }
        return acc
      }, {})

    modulesToLoad
      .forEach(m => m.init(modulesMethods))

    routes(routeConfig, listModules, modulesMethods, sysParam).init()
  }

  return {
    init
  }
}

// expose to global window
window.centralStudentAPI = centralStudentAPI
