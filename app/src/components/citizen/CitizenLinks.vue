<template>
  <dock-item title="Links" mainClass="citizen-links">
    <div v-for="link in citizen.links" :key="link.text" class="cit-link"><a :href="link.url">{{link.text}}</a></div>
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
          timeline.to(".citizen-links", 0.5, {opacity: 0})
          timeline.to(".citizen-links", 0, {display: "none"})
        } else {
          this.show = true
          const timeline = new TimelineLite()
          timeline.to(".citizen-links", 0, {display: "block"})
          timeline.to(".citizen-links", 1, {opacity: 1})
         // timeline.to(".citizen-links", 1, {width: "220px", height: "200px"})
          timeline.to(".citizen-links .section-title", 0.5, {opacity: 1})
          timeline.to(".citizen-links .cit-link", 1, {opacity: 1})
        }
      }
    }
  }
}
</script>

<style scoped> 
  .citizen-links {
    opacity: 0;
  }
  .citizen-links .content {
    display: flex;
    flex-direction: column;
  }

  .citizen-links .cit-link {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .citizen-links .cit-link::before {
    content: "> ";
  }

  .citizen-links a {
    text-decoration: none;
    color: #39ced8;
    padding-inline-start: 0;
  }
</style>