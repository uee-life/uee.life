<template>
  <div class="app">
    <main-header />
    <navbar />
    <div class="main">
      <dock name="leftDock" />
      <nuxt class="content" />
      <dock name="rightDock" />
    </div>
    <main-footer />
  </div>
</template>

<script>
import MainHeader from '@/components/layout/MainHeader'
import MainFooter from '@/components/layout/MainFooter'
import Navbar from '@/components/layout/Navbar'
import Dock from '@/components/layout/Dock'

import { Wormhole } from 'portal-vue'
Wormhole.trackInstances = false

export default {
  components: {
    MainHeader,
    MainFooter,
    Navbar,
    Dock
  }
}
</script>

<style scoped>
.app {
  position: relative;
  min-height: 100vh;
  max-width: 100vw;
  padding-bottom: 90px;
  font-family: Electrolize;
}
.main {
  display: flex;
  flex-wrap: wrap;
}
.app::before {
  position: fixed;
  content: "";
  background: url("~assets/nebula.jpg") repeat;
  opacity: 0.5;
  top:0;
  left:0;
  bottom: 0;
  right: 0;
  z-index: -2;
}
.app::after {
  position: fixed;
  content: "";
  background: url("~assets/gridbg_glow.png") repeat center top;
  opacity: 0.5;
  top:0;
  left:0;
  bottom: 0;
  right: 0;
  z-index: -1;
}

.content {
  padding-top: 10px;
  margin: 10px;
  flex-grow: 1;
  flex-basis: 300px;
}
</style>
