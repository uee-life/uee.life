<template>
    <dock-item title="Latest Citizen" class="latest-citizen">
      <div class="content">
        <portrait v-if="handle" :handle="handle" :showName="true" />
        <!--div v-if="citizen" >
          <nuxt-link class="portrait" :to="citizenLink">
            <img class="image" :src="citizen.portrait" />
            <img class="verified" src="~assets/verified.png" />
          </nuxt-link>
          <div class="cit-name">
            {{ citizen.name }}
          </div>
          <div class="cit-handle">
            {{ citizen.handle }}
          </div>
        </div-->
      </div>
    </dock-item>
</template>

<script>
import { gsap } from "gsap"

export default {
    name: "latest-citizen",
    props: ["handle"],
    data() {
      return {}
    },
    computed: {
        citizenLink () {
            return `/citizens/${this.citizen.handle}`;
        }
    },
    watch: {
      handle() {
        gsap.to(".latest-citizen", {duration: 1, opacity: 1})
      }
    },
    mounted() {
      gsap.to(".latest-citizen", {duration: 1, opacity: 1})
    }
}
</script>

<style scoped>
  .latest-citizen {
    opacity: 0;
    transition-property: all;
  }

  .latest-citizen .content div {
    display: flex;
    flex-direction: Column;
    margin: auto;
    opacity: 1;
  }
</style>