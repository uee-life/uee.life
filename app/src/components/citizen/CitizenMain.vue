<template>
  <div class="citizen-main" id="citizen-main">
        <portal to="rightDock">
            <citizen-org :citizen="citizen"/>
            <citizen-links :citizen="citizen"/>
        </portal>
        <citizen-info :citizen="citizen"/>
        <citizen-bio :bio="citizen.info.bio"/>
        <fleet-view :ships="citizen.ships"/>
  </div>
</template>

<script>
import CitizenOrg from '@/components/citizen/CitizenOrg.vue'
import CitizenLinks from '@/components/citizen/CitizenLinks.vue'
import CitizenInfo from '@/components/citizen/CitizenInfo.vue'
import CitizenBio from '@/components/citizen/CitizenBio.vue'
import FleetView from '@/components/fleet/FleetView.vue'

export default {
    name: "citizen-main",
    props: ["citizen"],
    components: {
        CitizenOrg,
        CitizenLinks,
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