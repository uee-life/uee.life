<template>
  <div class="citizen-links" id="citizen-links">
    <div class="content">
    External Links
    <ul>
        <li v-for="link in citizen.links" :key="link">
          <a :href="link">{{link.split('/')[2]}}</a>
        </li>
    </ul>
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
  name: "citizen-links",
  props: ['citizen'],
  data() {
    return {
      show: false
    }
  },
  watch: {
    'citizen.links': {
      handler: function() {
        if(this.citizen.links.length === 0) {
          this.show = false
          const timeline = new TimelineLite()
          timeline.to(".citizen-links .content", 0.5, {opacity: 0})
          timeline.to(".citizen-links", 0.5, {width: "50px", height: "50px"})
          timeline.to(".citizen-links", 0.5, {opacity: 0})
          timeline.to(".citizen-links", 0, {display: "none"})
        } else {
          this.show = true
          const timeline = new TimelineLite()
          timeline.to(".citizen-links", 0, {display: "block"})
          timeline.to(".citizen-links", 0.5, {opacity: 1})
          timeline.to(".citizen-links", 1, {width: "220px", height: "200px"})
          timeline.to(".citizen-links .content", 1, {opacity: 1})
        }
      }
    }
  }
}
</script>

<style>
  .citizen-links {
    position: relative;
    width: 50px;
    height: 50px;
    padding: 15px;
    border: 1px solid grey;
    background: url('/images/fading-bars.png') repeat;
    display: none;
  }
  .citizen-links .content {
    display: flex;
    flex-direction: column;
    opacity: 0;
  }
</style>