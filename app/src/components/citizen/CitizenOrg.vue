<template>
  <dock-item title="Org" mainClass="citizen-org">
      <router-link :to="orgLink"><img class="logo" :src="citizen.org.logo" /></router-link>
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
      return `/organization/${this.citizen.org.tag}`;
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
          timeline.to(".citizen-org", 1, {height: "300px"})
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
</style>