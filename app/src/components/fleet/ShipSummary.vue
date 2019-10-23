<template>
  <div id="ship-summary" class="ship-summary">
      <img :src="shipImage" />
      <div class="ship-info">
          <div>Ship: {{ ship.manufacturer }} {{ ship.make }}</div>
          <div>Model: {{ ship.model }}</div>
          <div>Name: {{ ship.name }}</div>
      </div>
                <span class="corner top left"></span>
          <span class="corner top right"></span>
          <span class="corner bottom left"></span>
          <span class="corner bottom right"></span>
  </div>
</template>

<script>
export default {
    name: 'ship-summary',
    props: ["ship"],
    computed: {
        shipImage: function() {
            return "/images/ships/" + [this.ship.manufacturer, this.ship.make].concat(this.ship.model.split(" ")).join(" ").trim().split(/\s+/).join("_") + ".jpg"
        }
    }
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
        margin: 5px;
        padding: 9px;
        border: 1px solid grey;
        position: relative;
        background: url('/images/fading-bars.png') repeat;
    }

    .ship-info {
        margin-left: 5px;
    }
</style>