import auth0 from 'auth0-js'

const config = require('~/config.json')


export default class Authenticator {
  constructor () {
    this.auth0 = new auth0.WebAuth({
      domain: config.AUTH0_DOMAIN,
      clientID: config.AUTH0_CLIENT_ID,
      redirectUri: `${config.APP_DOMAIN}/auth/signed-in`,
      audience: config.AUTH0_AUDIENCE,
      responseType: 'token id_token',
      scope: 'openid profile email'
    })
  }

  login () {
    this.auth0.authorize()
  }

  handleAuthentication () {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) return reject(err)

        resolve(authResult)
      })
    })
  }
}