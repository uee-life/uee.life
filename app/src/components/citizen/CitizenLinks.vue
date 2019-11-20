<template>
  <dock-item title="Links">
    <ul>
        <li v-for="link in citizen.links" :key="link">
          <a :href="link">{{link.split('/')[2]}}</a>
        </li>
    </ul>
  </dock-item>
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
          timeline.to(".citizen-links .section-title", 0.5, {opacity: 0})
          timeline.to(".citizen-links", 0.5, {width: "50px", height: "50px"})
          timeline.to(".citizen-links", 0.5, {opacity: 0})
          timeline.to(".citizen-links", 0, {display: "none"})
        } else {
          this.show = true
          const timeline = new TimelineLite()
          timeline.to(".citizen-links", 0, {display: "block"})
          timeline.to(".citizen-links", 0.5, {opacity: 1})
          timeline.to(".citizen-links", 1, {width: "220px", height: "200px"})
          timeline.to(".citizen-links .section-title", 0.5, {opacity: 1})
          timeline.to(".citizen-links .content", 1, {opacity: 1})
        }
      }
    }
  }
}
</script>

<style>
  .citizen-links .content {
    display: flex;
    flex-direction: column;
    opacity: 0;
  }
</style>