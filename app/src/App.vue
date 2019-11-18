<template>
  <div id="app" class="container">
    <link href="//fonts.googleapis.com/css?family=Electrolize|Orbitron:400,500,700|Share+Tech+Mono" rel="stylesheet" type="text/css">
    <!--img alt="Vue logo" src="@/assets/logo.png"-->
    <div class="main-header" id="main-header">
      <div class="main-header-left">
      <router-link to="/"><img class="logo" alt="logo" src="@/assets/logo.png"></router-link>
      <div class="title">
          <div>A portal to your life in the UEE...</div>
      </div>
      </div>
      <div class="main-header-right">
        <div v-if="!$auth.loading" class="user">
          <div v-if='$auth.isAuthenticated'>
              Welcome, <b>{{ $auth.user.name }}</b> ( <a @click='logout'> Log Out </a> )
          </div>
          <div v-else>
            Welcome! Please <a @click='login' id="login-button">Log In</a>
          </div>
          </div>
          <div class="search">
              <!--input type="search" class="search-box" value="Search"-->
          </div>
      </div>
    </div>
    <!--main-header /-->
    <nav-bar />
    <router-view />
  </div>
</template>

<script>
//import MainHeader from '@/components/MainHeader.vue'
import NavBar from '@/components/layout/NavBar.vue'

export default {
  name: 'app',
  components: {
//    MainHeader,
    NavBar
  },
  data() {
    return {
      location: {},
      authenticated: false
    }
  },
  methods: {
    login() {
      this.$auth.loginWithRedirect()
    },
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin
      });
    }
  }
}
</script>

<style scoped>
body {
        background: black;
        color: gainsboro;
        margin: 0;
    }
#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  font-family: 'Electrolize';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #39ced8;
  text-shadow: 0px 0px 15px rgba(57, 206, 216, 0.5);
  padding: 0;
}
.container::before {
  position: fixed;
  content: "";
  background: url("./assets/nebula.jpg") repeat;
  opacity: 0.5;
  top:0;
  left:0;
  bottom: 0;
  right: 0;
  z-index: -2;
}
.container::after {
  position: fixed;
  content: "";
  background: url("./assets/gridbg_glow.png") repeat center top;
  opacity: 0.5;
  top:0;
  left:0;
  bottom: 0;
  right: 0;
  z-index: -1;
}
.container {
  max-width: 100%;
}

        .main-header {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 110px;
        border: 1px solid black;
        background: rgba(13, 46, 66, 0.5);
    }
    .main-header-left {
        display: flex;
    }
    .title {
        align-self: center;
    }
    .title div {
        font-size: 20px;
    }
    .main-header-right {
        display: flex;
        flex-direction: column;
        margin: 15px;
    }
    .user {
        text-align: right;
    }
    .search {
        margin-top: 35px;
    }
    .search-box {
        background: white;
        height: 25px;
    }
    .logo {
        width: 90px;
        height: 90px;
        margin: 10px;
        align-self: center;
    }
</style>
<style>
    .corner.top {
        top: -2px;
        border-top: 1px solid white;
    }

    .corner.bottom {
        bottom: -2px;
        border-bottom: 1px solid white;
    }

    .corner.left {
        left: -2px;
        border-left: 1px solid white;
    }

    .corner.right {
        right: -2px;
        border-right: 1px solid white;
    }

    .corner {
        height: 20px;
        width: 20px;
        position: absolute;
    }

    .section-title {
        font-family: 'Michroma';
        position:absolute;
        left: 0;
        top:-13px;
        width: 100%;
        display: flex;
    }

    .section-title .text {
        position: relative;
        font-size: 14px;
        padding-left: 10px;
        padding-right: 10px;
        margin-left: 40px;
        text-shadow: 0px 0px 15px rgba(57, 206, 216, 0.5);
    }

    .section-title.small {
      top: -8px;
      opacity: 1;
    }

    .section-title.hidden {
      opacity: 0;
    }

    .section-title.small .text {
      font-size: 10px;
      margin-left: 30px;
    }

    .endcap {
      position: absolute;
      top: 0;
      height: 100%;
      width: 6px;
      border-top: 1px solid white;
      border-bottom: 1px solid white;
    }

    .endcap.left {
      left: 0;
      border-left: 1px solid white;
    }

    .endcap.right {
      right: 0;
      border-right: 1px solid white;
    }

    .hidden {
      opacity: 0;
    }
</style>