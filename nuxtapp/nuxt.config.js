module.exports = {
  /*
  ** Router config
  */
  router: {
    middleware: 'check-auth'
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'Your UEE Life',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'The Portal to your life in the UEE' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'https://uee.life/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: '//fonts.googleapis.com/css?family=Electrolize|Orbitron:400,500,700|Share+Tech+Mono'},
      { rel: 'stylesheet', type: 'text/css', href: '//fonts.googleapis.com/css?family=Michroma&display=swap'}
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    'normalize.css',
    '~assets/main.css'
  ],
  /*
  ** Environement variables
  */
  env: {
    AUTH0_CLIENT_ID: '',
    AUTH0_CLIENT_DOMAIN: ''
  }
}
