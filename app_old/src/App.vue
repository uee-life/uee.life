<template>
  <div id="app" class="container">
    <cookie-law theme="blood-orange"/>
    <page-head />
    <nav-bar />
    <router-view />
    <page-foot />
  </div>
</template>

<script>
import axios from "axios"
import PageHead from '@/components/layout/PageHead.vue'
import NavBar from '@/components/layout/NavBar.vue'
import PageFoot from '@/components/layout/PageFoot.vue'

export default {
  name: 'app',
  components: {
    PageHead,
    NavBar,
    PageFoot
  },
  methods: {
    async getUser() {
        const token = await this.$auth.getTokenSilently();
        axios({
          url: `https://api.uee.life/user`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then((res) => {
          // eslint-disable-next-line
          console.log(res)
          this.$store.commit('setUser', res.data)
        }).catch((error) => {
          // eslint-disable-next-line
          console.error(error)
        })
      },

  },
  mounted() {
    this.$nextTick(() => {
      let authed = this.$auth.isAuthenticated
      if(authed) {
        this.getUser()
      }
    })
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
  padding-bottom: 90px; /* making space for the footer */
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
  position: relative;
  min-height: 100vh;
  max-width: 100%;
}

</style>
<style>
    .corner.top {
        top: -2px;
        border-top: 1px solid #dbf3ff;
    }

    .corner.bottom {
        bottom: -2px;
        border-bottom: 1px solid #dbf3ff;
    }

    .corner.left {
        left: -2px;
        border-left: 1px solid #dbf3ff;
    }

    .corner.right {
        right: -2px;
        border-right: 1px solid #dbf3ff;
    }

    .corner {
        height: 20px;
        width: 20px;
        position: absolute;
    }

    .endcap {
      position: absolute;
      top: 0;
      height: 100%;
      width: 6px;
      border-top: 1px solid #dbf3ff;
      border-bottom: 1px solid #dbf3ff;
    }

    .endcap.left {
      left: 0;
      border-left: 1px solid #dbf3ff;
    }

    .endcap.right {
      right: 0;
      border-right: 1px solid #dbf3ff;
    }

    .hidden {
      opacity: 0;
    }
</style>