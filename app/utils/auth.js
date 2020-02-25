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
  if (process.server) return
  let err, err_msg = ''
  const params = getQueryParams()
  if ('error' in params) {
    err = params['error'],
    err_msg = params['error_description']
  }

  return {
    access_token: params['access_token'],
    token_expiry: params['expires_in'] ? params['expires_in'] : params['expiresIn'],
    id_token: params['id_token'],
    secret: params['state'],
    error: err,
    error_msg: err_msg
  }
}

export const setToken = (ctx, token, access_token, token_expiry) => {
  if (process.server) return

  const expires = addSeconds(new Date(), token_expiry)

  window.localStorage.setItem('id_token', token)
  window.localStorage.setItem('access_token', access_token)
  window.localStorage.setItem('token_expiry', expires)

  ctx.$cookies.set('id_token', access_token)
  ctx.$cookies.set('access_token', access_token)
  ctx.$cookies.set('token_expiry', expires)
}

export const updateAccessToken = (access_token, expires) => {
  if (process.server) return
  window.localStorage.setItem('access_token', access_token)
  window.localStorage.setItem('token_expiry', expires)
}

export const unsetToken = (ctx) => {
  if (process.server) return
  //if(process.browser) {
    window.localStorage.removeItem('id_token')
    window.localStorage.removeItem('access_token')
    window.localStorage.removeItem('token_expiry')
    window.localStorage.removeItem('user')
    window.localStorage.removeItem('secret')
    if (ctx.$cookies) {
      ctx.$cookies.remove('id_token')
      ctx.$cookies.remove('access_token')
      ctx.$cookies.remove('token_expiry')
    }
    window.localStorage.setItem('logout', Date.now())
  //}
}

export const getTokenFromCookie = (req) => {
  console.log('getting from cookie')
  if (!req.headers.cookie) return
  const cookies = req.headers.cookie.split(';')
  const id_token = cookies.find(c => c.trim().startsWith('id_token='))
  const token_expiry = cookies.find(c => c.trim().startsWith('token_expiry='))
  const access_token = cookies.find(c => c.trim().startsWith('access_token='))
  if (!id_token) return
  //const expiry = new Date(decodeURIComponent(expiryCookie.split('=')[1]).replace(/"/g, ''))

  const user = {}
  user['id_token'] = id_token.split('=')[1]
  user['access_token'] = access_token.split('=')[1]
  user['token_expiry'] = token_expiry.split('=')[1]
  return user
}

export const getTokenFromLocalStorage = () => {
  console.log('getting from storage')
  let id_token = undefined
  let access_token = undefined
  let token_expiry = undefined

  if(process.browser) {
    id_token = localStorage.getItem('id_token')
    access_token = localStorage.getItem('access_token')
    token_expiry = localStorage.getItem('token_expiry')
  }
  if (!id_token) return
  const user = {}
  user['id_token'] = id_token
  user['access_token'] = access_token
  user['token_expiry'] = token_expiry
  return user
}

export const setSecret = (secret) => window.localStorage.setItem('secret', secret)

export const checkSecret = (secret) => window.localStorage.secret === secret
