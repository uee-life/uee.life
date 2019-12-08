<template>
  <div class="planet-summary">
      <router-link :to="planetLink"><img v-if="planet.thumbnail" :src="planet.thumbnail" /></router-link>
          <div class="planet-info">
          <div><i><b>"{{ planet.name }}"</b></i></div>
          <div>Type: {{ planet.subtype }}</div>
          <div>Affiliation: {{ planet.affiliation }}</div>
      </div>
        <span class="corner top left"></span>
          <span class="corner top right"></span>
          <span class="corner bottom left"></span>
          <span class="corner bottom right"></span>
  </div>
</template>

<script>
export default {
    name: 'planet-summary',
    props: ["planet"],
    computed: {
        planetLink() {
            return `/system/${this.planet.system}/planet/${this.planet.name}`
        }
    }
}
</script>

<style scoped>
    img {
        width: 100px;
        margin-left: 1px;
    }

    .planet-summary {
        display: flex;
        width: 400px;
        min-width: 400px;
        flex-grow: 1;
        margin: 5px;
        padding: 9px;
        position: relative;
        background: url('/images/fading-bars.png') repeat;
    }

    .planet-info {
        margin-left: 10px;
    }
</style>