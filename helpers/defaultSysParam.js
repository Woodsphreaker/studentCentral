import atob from 'atob'

export default () => {
  const sessionCookies = decodeURIComponent(document.cookie.match(new RegExp('sessoes=([^;]+)'))[0])
  if (!sessionCookies) return {}

  const keys = {
    AdminMaster: 'master',
    ClienteID: 'clienteID',
    CompanyID: 'companyID',
    CompanyID_Edit: 'companyID',
    CourseRuleID: 'CourseRuleID',
    courseID: 'courseID',
    dLayout: 'dlayout',
    id_usuario: 'usuarioID',
    user_nome: 'userName',
    user_usuario: 'user',
    UsuarioFoto: 'userPicture',
    WebSiteRoot: 'urlRaiz'
  }

  return sessionCookies
    .slice(sessionCookies.indexOf('=') + 1)
    .split('&')
    .reduce((acc, el) => {
      const [key, value] = el.split('=')
      acc[ keys[key] || key ] = atob(value)
      return acc
    }, {})
}
