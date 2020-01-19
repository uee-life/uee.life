<template>
    <dock-item title="Latest Citizen" mainClass="latest-citizen">
      <div v-if="citizen" >
        <nuxt-link :to="citizenLink"><img class="logo" :src="citizen.portrait" /></nuxt-link>
        <div class="cit-name">
          {{ citizen.name }}
        </div>
        <div class="cit-handle">
          {{ citizen.handle }}
        </div>
      </div>
    </dock-item>
</template>

<script>
import { gsap } from "gsap"

export default {
    name: "latest-citizen",
    props: ["citizen"],
    data() {
      return {}
    },
    computed: {
        citizenLink () {
            return `/citizens/${this.citizen.handle}`;
        }
    },
    watch: {
      citizen() {
        gsap.to(".latest-citizen", {duration: 1, opacity: 1})
      }
    }
}
</script>

<style>
  .latest-citizen {
    opacity: 0;
    transition-property: all;
  }

  .latest-citizen .content div {
    display: flex;
    flex-direction: Column;
    align-items: center;
    opacity: 1;
  }
  .logo {
    width: 165px;
    height: 165px; 
    align-self: center;
    margin: 10px;
  }
  .cit-name {
    align-self: center;
    font-size: 18px;
  }
  .cit-handle {
    align-self: center;
    font-size: 12px;
  }

  .latest-citizen .content div.citizen-stats {
    align-items: start;
  }

  .latest-citizen .content div.citizen-stats h3 {
    align-self: center;
  }

  .citizen-stat {
    align-self: left;
  }

  .stat-header {
    margin: 5px;
  }
</style>