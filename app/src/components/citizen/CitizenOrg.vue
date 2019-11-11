<template>
  <div refs="org" class="citizen-org" id="citizen-org">
    <div class="content">
      <img class="logo" :src="citizen.org.logo" />
      <div class="org-name">
        {{ citizen.org.name }}
      </div>
      <div class="org-title">
        Title: {{ citizen.info.orgRank }}
      </div>
    </div>
    <span class="corner top left"></span>
    <span class="corner top right"></span>
    <span class="corner bottom left"></span>
    <span class="corner bottom right"></span>
  </div>
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
      mounted() {
        const timeline = new TimelineLite()

        timeline.to(".citizen-org", 1, {width: "100%", height: "320px"})
        timeline.to(".citizen-org .content", 1, {opacity: 1})
    }
}
</script>

<style>
  .citizen-org {
    position: relative;
    padding: 15px;
    height: 50px;
    width: 50px;
    border: 1px solid grey;
    background: url('/images/fading-bars.png') repeat;
  }
  .content{
    display: flex;
    flex-direction: Column;
    justify-content: center;
    opacity: 0;
  }
  .logo {
    width: 165px;
    height: 165px; 
    align-self: center;
    margin: 10px;
  }
  .org-name {
    align-self: center;
    font-size: 20px;
    text-align: center;
  }
  .org-title {
    align-self: center;
    margin-bottom: 15px;
    text-align: center;
  }
</style>