<template>
  <div class="app">
    <div class="main">
      <main-header />
      <navbar />
      <nuxt />
    </div>
  </div>
</template>

<script>
import MainHeader from '@/components/layout/MainHeader'
import Navbar from '@/components/layout/Navbar'

export default {
  components: {
    MainHeader,
    Navbar
  }
}
</script>

<style scoped>
.app {
  height: 100vh;
  width: 100vw;
  font-family: Electrolize;
}
.main {
  margin: 0 auto;
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
</style>
