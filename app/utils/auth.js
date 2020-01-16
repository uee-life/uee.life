import jwtDecode from 'jwt-decode'
import Cookie from 'js-cookie'

const getQueryParams = () => {
  const params = {}
  $nuxt.$route.fullPath.replace(/([^(?|#)=&]+)(=([^&]*))?/g, ($0, $1, $2, $3) => {
    params[$1] = $3
  })
  return params
}

export const extractInfoFromHash = () => {
  if (process.SERVER_BUILD) return
  let err, err_msg = ''
  const params = getQueryParams()
  if ('error' in params) {
    err = params['error'],
    err_msg = params['error_description']
  }
  const { id_token, state } = getQueryParams()
  return {
    access_token: params['access_token'],
    token: params['id_token'],
    secret: params['state'],
    error: err,
    error_msg: err_msg
  }
}

export const setToken = (token, access_token) => {
  if (process.SERVER_BUILD) return
  //if(process.browser) {
    window.localStorage.setItem('token', token)
    window.localStorage.setItem('access_token', access_token)
    window.localStorage.setItem('user', JSON.stringify(jwtDecode(token)))
    Cookie.set('jwt', token)
  //}
}

export const updateAccessToken = (access_token) => {
  if (process.SERVER_BUILD) return
  window.localStorage.setItem('access_token', access_token)
}

export const unsetToken = () => {
  if (process.SERVER_BUILD) return
  //if(process.browser) {
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('access_token')
    window.localStorage.removeItem('user')
    window.localStorage.removeItem('secret')
    Cookie.remove('jwt')
    window.localStorage.setItem('logout', Date.now())
  //}
}

export const getUserFromCookie = (req) => {
  if (!req.headers.cookie) return
  const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('jwt='))
  if (!jwtCookie) return
  console.log(jwtCookie)
  const jwt = jwtCookie.split('=')[1]
  const user = {}
  user['token'] = null
  user['user'] = jwtDecode(jwt)
  return user
}

export const getUserFromLocalStorage = () => {
  let json = undefined
  let token = undefined
  if(process.browser) {
    json = window.localStorage.user
    token = window.localStorage.access_token
  }
  const user = {}
  user['token'] = token
  user['user'] = json ? JSON.parse(json) : undefined
  return user
}

export const setSecret = (secret) => window.localStorage.setItem('secret', secret)

export const checkSecret = (secret) => window.localStorage.secret === secret
