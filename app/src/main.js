import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

import Citizen from '@/components/citizen/Citizen.vue'

Vue.config.productionTip = false

Vue.use(VueRouter)

const routes = [
  { path: '/citizen', component: Citizen}
]

const router = new VueRouter({
  routes
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
