<template>
  <dock-item class="org-panel">
      <div class="content">
        <section-title v-if="org" :text="org.model" />
        <nuxt-link v-if="org" :to="orgLink" class="org-link"><img class="logo" :src="org.logo" /></nuxt-link>
        <div v-if="org" class="org-name">
          {{ org.name }}
        </div>
      </div>
  </dock-item>
</template>

<script>
import { gsap } from "gsap"

export default {
  name: "org-panel",
  props: ['org_tag'],
  data() {
    return {
      org: null
    }
  },
  computed: {
    orgLink () {
      return `/orgs/${this.org_tag}`;
    }
  },
  methods: {
    getOrg() {
      this.$axios({
        url: `https://api.uee.life/orgs/${this.org_tag}`,
        method: 'GET'
      }).then((res) => {
        console.log('org loaded...')
        this.org = res.data
      }).catch((err) => {
        console.error(err)
      })
    }
  },
  watch: {
    org: {
      handler: function() {
        if(this.org) {
            gsap.to(".org-panel", {duration: 0.5, opacity: 1})
            gsap.fromTo(".org-panel", {height: "50px"}, {duration: 0.6, height: "auto"})
            gsap.to(".org-panel .content", {duration: 1, delay: 0.6, opacity: 1})
        }
      }
    }
  },
  mounted() {
    this.getOrg()
  }
}
</script>

<style>
  .org-panel {
    position: relative;
    height: 50px;
    margin-bottom: 20px;
    opacity: 0;
  }
  .org-panel .content{
    display: flex;
    flex-direction: Column;
    justify-content: center;
    opacity: 0;
  }
  .org-panel .logo {
    width: 165px;
    height: 165px; 
    align-self: center;
    margin: 10px;
  }
  .org-panel .org-name {
    align-self: center;
    font-size: 20px;
    text-align: center;
  }

  .org-link {
    display: flex;
    justify-content: center;
  }
</style>