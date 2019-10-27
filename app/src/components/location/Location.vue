<template>
  <div class="location" id="location">
      <geomap />
      <location-data />
  </div>
</template>

<script>
import LocationData from '@/components/location/LocationData.vue'
import Geomap from '@/components/location/Geomap.vue'

export default {
    name: "location",
    components: {
        LocationData,
        Geomap
    }
}
</script>

<style>
    .location {
        display: flex;
    }
</style>