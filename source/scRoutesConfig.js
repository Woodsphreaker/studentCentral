export default [
  {
    route: ['/', 'track-list'],
    loadModules: ['headerInfoSimple', 'menuSimple', 'graphicsInfoBar', 'tracksList']
  },
  {
    route: ['track-info'],
    loadModules: ['trackInfo', 'menuSimple', 'graphicsInfoBar', 'coursesList']
  },
  {
    route: ['courses-list-table'],
    loadModules: ['headerInfoSimple', 'menuSimple', 'coursesListTable']
  },
  {
    route: ['course-info'],
    loadModules: ['courseInfo', 'menuSimple', 'graphicsInfoBar', 'courseAttributes', 'comments']
  },
  {
    route: ['courses-free-list'],
    loadModules: ['headerInfoSimple', 'menuSimple', 'graphicsInfoBar', 'coursesList']
  },
  {
    route: ['finished-list'],
    loadModules: ['headerInfoSimple', 'menuSimple']
  },
  {
    route: ['catalog-list'],
    loadModules: ['headerInfoSimple', 'menuSimple', 'catalogList']
  },
  {
    route: ['404'],
    loadModules: ['error']
  }
]
