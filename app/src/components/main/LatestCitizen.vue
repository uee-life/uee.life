<template>
    <dock-item title="Latest Citizen" mainClass="latest-citizen">
      <div v-if="citizen" >
      <router-link :to="citizenLink"><img class="logo" :src="citizen.info.portrait" /></router-link>
      <div class="cit-name">
        {{ citizen.info.name }}
      </div>
      <div class="cit-handle">
        Handle: {{ citizen.info.handle }}
      </div>
      </div>
    </dock-item>
</template>

<script>
import { TimelineLite } from "gsap"
import axios from "axios"

export default {
    name: "latest-citizen",
    data() {
        return {
          latest: "Talyian",
            citizen: null
        }
    },
    computed: {
        citizenLink () {
        return `/citizens/${this.citizen.info.handle}`;
        }
    },
    methods: {
      async getLatest() {
        axios({
          url: `https://api.uee.life/citizen/${this.latest}`,
          method: 'GET'
        }).then((res) => {
          this.citizen = res.data
        }).catch((error) => {
          // eslint-disable-next-line
          console.error(error)
        });
      }
    },
    watch: {
      citizen() {
        const timeline = new TimelineLite()

        timeline.to(".latest-citizen", 1, {opacity: 1})
      }
    },
    mounted() {
        this.getLatest()
    }
}
</script>

<style>
  .latest-citizen {
    opacity: 1;
    transition-property: all;
  }

  .latest-citizen .content div{
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
    font-size: 20px;
  }
  .cit-handle {
    align-self: center;
    margin-bottom: 15px;
  }
</style>