<template>
  <div id="ship-summary" class="ship-summary">
      <img :src="shipImage" />
      <div class="ship-info">
          <div><i><b>"{{ ship.name }}"</b></i></div>
          <div>{{ ship.manufacturer }} {{ ship.make }} {{ ship.model }}</div>
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