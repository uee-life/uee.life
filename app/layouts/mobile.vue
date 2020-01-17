<template>
  <div class="app">
    <mobile-header />
    <mobile-navbar />
    <div class="main">
      <dock name="leftDock" />
      <nuxt class="content" />
      <dock name="rightDock" />
    </div>
    <mobile-footer />
  </div>
</template>

<script>
import MobileHeader from '@/components/layout/MobileHeader'
import MobileFooter from '@/components/layout/MobileFooter'
import MobileNavbar from '@/components/layout/MobileNavbar'
import Dock from '@/components/layout/Dock'

export default {
  components: {
    MobileHeader,
    MobileFooter,
    MobileNavbar,
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

 .dock {
   width: 100%;
 }
</style>
