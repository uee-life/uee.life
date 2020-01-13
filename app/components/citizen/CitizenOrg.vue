<template>
  <dock-item :title="citizen.org.model" mainClass="citizen-org">
      <nuxt-link :to="orgLink" class="org-link"><img class="logo" :src="citizen.org.logo" /></nuxt-link>
      <div class="org-name">
        {{ citizen.org.name }}
      </div>
      <div class="org-title">
        Title: {{ citizen.info.orgRank }}
      </div>
  </dock-item>
</template>

<script>
import { TimelineLite } from "gsap"

export default {
  name: "citizen-org",
  props: ['citizen'],
  data() {
    return {
      logo: "https://robertsspaceindustries.com/media/2weountodg09pr/heap_infobox/MCBANE-Logo.png"
    }
  },
  computed: {
    orgLink () {
      return `/orgs/${this.citizen.org.tag}`;
    }
  },
  watch: {
    'citizen.org': {
      handler: function() {
        if(Object.keys(this.citizen.org).length === 0) {
          const timeline = new TimelineLite()
          timeline.to(".citizen-org .content", 0.5, {opacity: 0})
          timeline.to(".citizen-org .section-title", 0.5, {opacity: 0})
          timeline.to(".citizen-org", 1, {height: "50px"})
          timeline.to(".citizen-org", 0, {display: "none"})
        } else {
          const timeline = new TimelineLite()
          timeline.to(".citizen-org", 0, {display: "block"})
          timeline.fromTo(".citizen-org", 0.6, {height: "50px"}, {height: "auto"})
          timeline.to(".citizen-org .section-title", 0.5, {opacity: 1})
          timeline.to(".citizen-org .content", 1, {opacity: 1})
        }
      }
    }
  }
}
</script>

<style>
  .citizen-org {
    position: relative;
    height: 50px;
    display: none;
    margin-bottom: 20px;
  }
  .citizen-org .content{
    display: flex;
    flex-direction: Column;
    justify-content: center;
    opacity: 0;
  }
  .citizen-org .logo {
    width: 165px;
    height: 165px; 
    align-self: center;
    margin: 10px;
  }
  .citizen-org .org-name {
    align-self: center;
    font-size: 20px;
    text-align: center;
  }
  .citizen-org .org-title {
    align-self: center;
    margin-bottom: 15px;
    text-align: center;
  }

  .org-link {
    display: flex;
    justify-content: center;
  }
</style>