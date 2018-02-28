// Local Components
import catalogList from './scCatalogList'
import courseAttributes from './scCourseAttributes'
import comments from './scComments'
import coursesList from './scCoursesList'
import coursesListTable from './scCourseListTable'
import courseInfo from './scCourseInfo'
import error from './sc404'
import headerInfoSimple from './scHeaderInfoSimple'
import hbsHelpers from './handlebarsHelpers'
import graphicsInfoBar from './scGraphicsInfoBar'
import menuSimple from './scMenuSimple'
import tracksList from './scTracksList'
import trackInfo from './scTrackInfo'
import defaultSysParam from '../../Helpers/modules/defaultSysParam'
import search from './scSearch'

// routes
import routes from '../../Helpers/modules/routes'
import routesConfig from './scRoutesConfig'

const centralStudentAPI = (sysParam = {}) => {
  const init = data => {
    Object.assign(sysParam, defaultSysParam(), data)
    configModules()
    hbsHelpers()
  }

  const configModules = () => {
    const listModules = [
      {moduleInstace: catalogList, el: 'main', name: 'catalogList'},
      {moduleInstace: comments, el: 'comments', name: 'comments'},
      {moduleInstace: courseAttributes, el: 'main', name: 'courseAttributes'},
      {moduleInstace: courseInfo, el: 'courseInfo', name: 'courseInfo'},
      {moduleInstace: coursesList, el: 'main', name: 'coursesList'},
      {moduleInstace: coursesListTable, el: 'main', name: 'coursesListTable'},
      {moduleInstace: error, el: 'main', name: 'error'},
      {moduleInstace: graphicsInfoBar, el: 'graphicsInfoBar', name: 'graphicsInfoBar'},
      {moduleInstace: headerInfoSimple, el: 'headerInfoSimple', name: 'headerInfoSimple'},
      {moduleInstace: menuSimple, el: 'menuSimple', name: 'menuSimple'},
      {moduleInstace: search, el: 'search', name: 'search'},
      {moduleInstace: tracksList, el: 'main', name: 'tracksList'},
      {moduleInstace: trackInfo, el: 'trackInfo', name: 'trackInfo'}
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

    routes(routesConfig, listModules, modulesMethods, sysParam).init()
  }

  return {
    init
  }
}

// expose to global window
window.centralStudentAPI = centralStudentAPI
