import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

import Citizen from '@/components/citizen/Citizen.vue'
import Location from '@/components/location/Location.vue'

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

Vue.use(VueRouter)

const routes = [
  { path: '/citizen', component: Citizen },
  { path: '/location/:name', component: Location }
]

const router = new VueRouter({
  routes
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
