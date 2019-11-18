<template>
  <div class="citizen-main" id="citizen-main">
        <portal to="rightDock">
            <citizen-org :citizen="citizen"/>
        </portal>
        <portal to="leftDock">
            <citizen-links :citizen="citizen"/>
        </portal>
        <citizen-info :citizen="citizen"/>

        <div>
            <tabs :tabs="tabs" :initialTab="initialTab">
                <template slot="tab-title-info">
                    INFO
                </template>
                <template slot="tab-content-info">
                    <citizen-bio :bio="citizen.info.bio"/>
                </template>

                <template slot="tab-title-ships">
                    SHIPS
                </template>
                <template slot="tab-content-ships">
                    <fleet-view :ships="citizen.ships"/>
                </template>

            </tabs>
        </div>
  </div>
</template>

<script>
import CitizenOrg from '@/components/citizen/CitizenOrg.vue'
import CitizenLinks from '@/components/citizen/CitizenLinks.vue'
import CitizenInfo from '@/components/citizen/CitizenInfo.vue'
import CitizenBio from '@/components/citizen/CitizenBio.vue'

import Tabs from '@/components/layout/Tabs.vue'
import FleetView from '@/components/fleet/FleetView.vue'

export default {
    name: "citizen-main",
    props: ["citizen"],
    components: {
        CitizenOrg,
        CitizenLinks,
        CitizenInfo,
        CitizenBio,
        FleetView,
        Tabs
    },
    data() {
        return {
            tabs: ["info","ships"],
            initialTab: "info"
        }
    },
}
</script>

<style scoped>
    .citizen-main {
        width: 100%;
        padding: 10px;
        padding-top: 20px;
    }
</style>