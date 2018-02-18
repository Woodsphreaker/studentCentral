const setState = ({obj = {}, name = 'state', stateName = ''}) => {
  history.pushState(obj, name, `#${stateName}`)
  history.pushState('', '', '')
  history.back()
}

const replaceState = ({obj = {}, name = 'state', stateName = ''}) => {
  history.replaceState(obj, name, `#${stateName}`)
  history.pushState('', '', '')
  history.back()
}

const getStateHash = () => {
  const hash = location.hash
  const state = hash.slice(1)
  if (!hash) return '/'
  return state
}

const getState = () => {
  const state = getStateHash()
  const bar = state.indexOf('/')
  if (state.length === 1) return state
  if (bar > 0) return state.slice(0, bar)
  return state
}

const getStateOptions = () => {
  const state = getStateHash()
  const bar = state.indexOf('/')
  return state.slice((bar - 1 >>> 0) + 1)
}

export {setState, replaceState, getState, getStateOptions}
