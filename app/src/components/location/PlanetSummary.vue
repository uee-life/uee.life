<template>
  <div class="planet-summary">
      <img v-if="planet.thumbnail" :src="planet.thumbnail" />
      <div class="planet-info">
          <div><i><b>"{{ planet.name }}"</b></i></div>
          <div>{{ planet.type }} | {{ planet.subtype }} | {{ planet.affiliation }}</div>
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
    props: ["planet"]
}
</script>

<style scoped>
    img {
        width: 170px;
        margin-left: 1px;
    }

    .ship-summary {
        display: flex;
        width: 400px;
        min-width: 400px;
        flex-grow: 1;
        margin: 5px;
        padding: 9px;
        position: relative;
        background: url('/images/fading-bars.png') repeat;
    }

    .ship-info {
        margin-left: 10px;
    }
</style>