<template>
  <div class="citizen-main" id="citizen-main">
      <citizen-info />
      <citizen-bio />
      <fleet-view />
  </div>
</template>

<script>
import CitizenInfo from '@/components/citizen/CitizenInfo.vue'
import CitizenBio from '@/components/citizen/CitizenBio.vue'
import FleetView from '@/components/FleetView.vue'

export default {
    name: "citizen-main",
    components: {
        CitizenInfo,
        CitizenBio,
        FleetView
    }

}
</script>

<style scoped>
    .citizen-main {
        width: 100%;
        padding: 10px;
    }
</style>