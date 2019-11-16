<template>
  <div class="citizen-links" id="citizen-links">
    <div class="content">
    External Links
    <ul>
        <li v-for="link in citizen.links" :key="link">
          <a :href="link">{{link.split("/")[2]}}</a>
        </li>
        <li>Twitter: <a href="https://twitter.com/Capn_Flint">@Capn_Flint</a></li>
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
  mounted() {
    const timeline = new TimelineLite()

    timeline.to(".citizen-links", 1, {width: "100%", height: "200px"})
    timeline.to(".citizen-links .content", 1, {opacity: 1})
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
    margin-top: 20px;
    background: url('/images/fading-bars.png') repeat;
  }
  .citizen-links .content {
    display: flex;
    flex-direction: column;
    opacity: 0;
  }
</style>