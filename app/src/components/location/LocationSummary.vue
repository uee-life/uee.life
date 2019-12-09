<template>
    <router-link class="summary" :to="link">
      <img v-if="loc.thumbnail" :src="loc.thumbnail" />
          <div class="summary-info">
          <div><h3 class="summary-name">{{ loc.name }}</h3></div>
          <div>Type: {{ loc.subtype }}</div>
          <div>Affiliation: {{ loc.affiliation }}</div>
          <div>Habitable: {{ isHabitable }}</div>
      </div>
        <span class="corner top left"></span>
          <span class="corner top right"></span>
          <span class="corner bottom left"></span>
          <span class="corner bottom right"></span>
  </router-link>
</template>

<script>
export default {
    name: 'location-summary',
    props: ["loc", "link"],
    computed: {
        moonLink() {
            return `/system/${this.satellite.system}/planet/${this.planet}/moon/${this.satellite.name}`
        },
        isHabitable() {
            if(this.loc.habitable) {
                return "Yes"
            } else {
                return "No"
            }
        }
    }
}
</script>

<style scoped>
    .summary img {
        width: 100px;
        margin-left: 1px;
        border: 1px dotted #546f84;
    }

    .summary {
        display: flex;
        width: 400px;
        min-width: 400px;
        flex-grow: 1;
        margin: 5px;
        padding: 9px;
        position: relative;
        background: url('/images/fading-bars.png') repeat;
        text-decoration: none;
        color: inherit;
    }

    .summary-info {
        margin-left: 10px;
    }

    .summary-name {
        margin:2px 0;
    }
</style>