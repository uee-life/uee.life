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
import CitizenSearch from '@/components/citizen/CitizenSearch.vue'
import Organization from '@/components/org/Organization.vue'
import OrgSearch from '@/components/org/OrgSearch.vue'
import Profile from '@/components/user/Profile.vue'
import NewsArticle from '@/components/news/NewsArticle.vue'
import SignUp from '@/components/user/SignUp.vue'

import { authGuard } from "@/auth/authGuard"

const routes = [
  { path: '/', component: FrontPage },
  { path: '/citizens/:handle', component: Citizen },
  { path: '/citizens', component: CitizenSearch },
  { path: '/orgs/:org', component: Organization},
  { path: '/orgs', component: OrgSearch},
  { path: '/profile', component: Profile, beforeEnter: authGuard },
  { path: '/news/:newsId', component: NewsArticle },
  { path: '/signup', component: SignUp },
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
