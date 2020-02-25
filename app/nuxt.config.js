const config = require('./config.json')

module.exports = {
  buildModules: [
    ['@nuxtjs/google-analytics', {
      id: 'UA-158029027-1'
    }]
  ],

  /*
  ** Router config
  */
  router: {
    middleware: [
      'mobile'
    ]
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
      { rel: 'stylesheet', type: 'text/css', href: '//fonts.googleapis.com/css?family=Michroma&display=swap'},
      { rel: 'stylesheet', type: 'text/scss', href: 'sweetalert2/src/sweetalert2.scss'}
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
  },

  /*
  ** Global Components
  */
  plugins: [
    '~/plugins/layout.js',
    '~/plugins/widgets.js',
    '~/plugins/isMobile.js',
    { src: '~/plugins/vue-good-table', ssr: false },
    { src: '~/plugins/hamburger', ssr: false },
  ],

  /*
  ** Modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/markdownit',
    'portal-vue/nuxt',
    'cookie-universal-nuxt',
    [
      'nuxt-sweetalert2',
      {
        confirmButtonColor: '#41b882',
        cancelButtonColor: '#ff7674'
      }
    ]
  ],

  auth: {
    plugins: ['~/plugins/auth.js'],
    redirect: {
      login: '/',
      callback: '/auth/signed-in'
    },
    strategies: {
      local: false,
      auth0: {
        domain: config.AUTH0_DOMAIN,
        client_id: config.AUTH0_CLIENT_ID,
        audience: config.AUTH0_AUDIENCE
      }
    }
  },

  markdownit: {
    injected: true,
    breaks: true,
  },

  /*
  **
  */

  pageTransition: {
    name: 'default',
    mode: 'out-in'
  },
  layout: {
    name: 'layout',
    mode: 'out-in'
  }
}
