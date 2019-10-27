<template>
  <div class="citizen-bio" id="citizen-bio">
      Bio:
      <div ref="bio" class="bio">
          <div class="content">{{ bio }}</div>
          <span class="corner top left"></span>
          <span class="corner top right"></span>
          <span class="corner bottom left"></span>
          <span class="corner bottom right"></span>
      </div>
        
  </div>
</template>

<script>
import { TimelineLite } from 'gsap'

export default {
    name: "citizen-bio",
    props: ["bio"],
    mounted() {
        const {bio} = this.$refs
        const timeline = new TimelineLite()

        timeline.to(bio, 1, {width: "100%", height: "200px"})
        timeline.to(".bio .content", 1, {opacity: 1})
    }
}
</script>

<style scoped>
    .bio {
        display: block;
        position: relative;
        width: 50px;
        height: 50px;
        border: 1px solid grey;
        padding: 5px;
        background: url('/images/fading-bars.png') repeat;
        margin-bottom: 20px;
    }
    .bio .content {
        display: flex;
        justify-content: flex-start;
        position: relative;
        height: 100%;
        opacity: 0;
        overflow: hidden;
        align-self: flex-start;
    }
</style>