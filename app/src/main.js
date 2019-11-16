import Vue from 'vue'
import VueRouter from 'vue-router'
import PortalVue from 'portal-vue'
import Auth from '@okta/okta-vue'
import axios from 'axios'

import App from './App.vue'

import FrontPage from '@/components/main/FrontPage.vue'
import Citizen from '@/components/citizen/Citizen.vue'
import Location from '@/components/location/Location.vue'
import Org from '@/components/org/Org.vue'

Vue.config.productionTip = false

Vue.config.ignoredElements = [
  'x3d',
  'scene',
  'navigationInfo',
  'transform',
  'cylinderSensor',
  'group',
  'matrixTransform',
  'directionalLight',
  'viewpoint',
  'sphere',
  'ImageTexture',
  'appearance',
  'shape',
  'material'
]

Vue.use(axios)
Vue.use(VueRouter)
Vue.use(PortalVue)
Vue.use(Auth, {
  issuer: 'https://dev-185424.okta.com/oauth2/default',
  clientId: '0oa1s8lscwCuWnZ2R357',
  redirectUri: 'http://localhost:8080/implicit/callback',
  scopes: ['openid', 'profile', 'email'],
  pkce: true
})

const routes = [
  { path: '/', component: FrontPage },
  { path: '/citizen/:handle', component: Citizen },
  { path: '/location/:name', component: Location },
  { path: '/org', component: Org},
  { path: '/implicit/callback', component: Auth.handleCallback() },
  { path: '*', component: FrontPage }
]

const router = new VueRouter({
  mode: 'history',
  routes: routes
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
