import { setSecret } from './auth'

import uuid from 'uuid'

const getLock = (options) => {
  const config = require('~/config.json')
  const Auth0Lock = require('auth0-lock').default
  return new Auth0Lock(config.AUTH0_CLIENT_ID, config.AUTH0_DOMAIN, options)
}

const getBaseUrl = () => `${window.location.protocol}//${window.location.host}`

const getOptions = (container) => {
  const config = require('~/config.json')
  const secret = uuid.v4()
  setSecret(secret)
  return {
    container,
    closable: false,
    auth: {
      responseType: 'token id_token',
      redirectUrl: `${getBaseUrl()}/auth/signed-in`,
      params: {
        scope: 'openid profile email',
        state: secret,
        audience: config.AUTH0_AUDIENCE
      }
    },
    theme: {
      logo: 'https://uee.life/images/uee.life.logo.jpg',
      primaryColor: 'rgb(11, 35, 49)'
    },
    languageDictionary: {
      title: "UEE.Life Authentication"
    },
    additionalSignUpFields: [{
      name: 'handle',
      placeholder: 'RSI Handle',
      validator: function(handle) {
        return {
          valid: handle.length > 1,
          hint: "Must specify your RSI Handle"
        }
      }
    }]
  }
}

export const showLogin = (container) => getLock(getOptions(container)).show()
export const logout = () => getLock().logout({ returnTo: getBaseUrl() })
export const checkSession = (opt, cb) => getLock().checkSession(opt, cb)