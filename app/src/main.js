import Vue from 'vue'
import VueRouter from 'vue-router'
import PortalVue from 'portal-vue'
import axios from 'axios'

import App from './App.vue'

import { domain, clientId, audience } from "../auth_config.json";
import { Auth0Plugin } from "./auth";

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

Vue.use(Auth0Plugin, {
  domain, 
  clientId,
  audience,
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  }
});

// Global components
import SectionTitle from '@/components/layout/SectionTitle.vue'
import LeftDock from '@/components/layout/LeftDock.vue'
import RightDock from '@/components/layout/RightDock.vue'
import DockItem from '@/components/layout/DockItem.vue'
import MainPanel from '@/components/layout/MainPanel.vue'
import Tabs from '@/components/layout/Tabs.vue'

Vue.component('section-title', SectionTitle)
Vue.component('left-dock', LeftDock)
Vue.component('right-dock', RightDock)
Vue.component('dock-item', DockItem)
Vue.component('main-panel', MainPanel)
Vue.component('tabs', Tabs)


import CookieLaw from 'vue-cookie-law'
Vue.component('cookie-law', CookieLaw)

// Route components
import FrontPage from '@/components/main/FrontPage.vue'
import Citizen from '@/components/citizen/Citizen.vue'
import Organization from '@/components/org/Organization.vue'
import Settings from '@/components/user/Settings.vue'

import { authGuard } from "@/auth/authGuard"

const routes = [
  { path: '/', component: FrontPage },
  { path: '/citizen/:handle', component: Citizen },
  { path: '/organization/:org', component: Organization},
  { path: '/implicit/callback', component: FrontPage },
  { path: '/settings', component: Settings, beforeEnter: authGuard },
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
