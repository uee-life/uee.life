<template>
    <router-link class="summary" :to="link">
      <img v-if="loc.thumbnail" :src="loc.thumbnail" />
          <div class="summary-info">
          <div><h3 class="summary-name">{{ loc.name }}</h3></div>
          <slot></slot>
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
        height: 100px;
        margin-left: 1px;
        border: 1px dotted #546f84;
    }

    .summary {
        display: flex;
        flex-basis: 250px;
        flex-grow: 1;
        margin: 10px;
        padding: 9px;
        position: relative;
        background: url('/images/fading-bars.png') repeat;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
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