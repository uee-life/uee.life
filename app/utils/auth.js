import jwtDecode from 'jwt-decode'
import { addSeconds } from 'date-fns'

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

  return {
    access_token: params['access_token'],
    token_expiry: params['expires_in'] ? params['expires_in'] : params['expiresIn'],
    token: params['id_token'],
    secret: params['state'],
    error: err,
    error_msg: err_msg
  }
}

export const setToken = (ctx, token, access_token, token_expiry) => {
  if (process.SERVER_BUILD) return

  const expires = addSeconds(new Date(), token_expiry)

  window.localStorage.setItem('token', token)
  window.localStorage.setItem('access_token', access_token)
  window.localStorage.setItem('access_token_expiry', expires)
  window.localStorage.setItem('user', JSON.stringify(jwtDecode(token)))

  ctx.$cookies.set('jwt', token)
  ctx.$cookies.set('jwt_expires', expires)
}

export const updateAccessToken = (access_token, expires) => {
  if (process.SERVER_BUILD) return
  window.localStorage.setItem('access_token', access_token)
  window.localStorage.setItem('access_token_expiry', expires)
}

export const unsetToken = (ctx) => {
  if (process.SERVER_BUILD) return
  //if(process.browser) {
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('access_token')
    window.localStorage.removeItem('access_token_expiry')
    window.localStorage.removeItem('user')
    window.localStorage.removeItem('secret')
    ctx.$cookies.remove('jwt')
    ctx.$cookies.remove('jwt_expires')
    window.localStorage.setItem('logout', Date.now())
  //}
}

export const getUserFromCookie = (req) => {
  console.log('getting from cookie')
  if (!req.headers.cookie) return
  const cookies = req.headers.cookie.split(';')
  const jwtCookie = cookies.find(c => c.trim().startsWith('jwt='))
  const expiryCookie = cookies.find(c => c.trim().startsWith('jwt_expires='))
  if (!jwtCookie) return
  const expiry = new Date(decodeURIComponent(expiryCookie.split('=')[1]).replace(/"/g, ''))
  const jwt = jwtCookie.split('=')[1]
  const user = {}
  user['token'] = jwt
  user['token_expiry'] = expiry
  user['user'] = jwtDecode(jwt) || null
  return user
}

export const getUserFromLocalStorage = () => {
  console.log('getting from storage')
  let json = undefined
  let token = undefined
  let expires = undefined
  if(process.browser) {
    json = window.localStorage.user
    token = window.localStorage.access_token
    expires = window.localStorage.access_token_expiry
  }
  const user = {}
  user['token'] = token
  user['token_expiry'] = expires
  user['user'] = json ? JSON.parse(json) : undefined
  return user
}

export const setSecret = (secret) => window.localStorage.setItem('secret', secret)

export const checkSecret = (secret) => window.localStorage.secret === secret
