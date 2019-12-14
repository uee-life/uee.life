<template>
  <div class="citizen-main" id="citizen-main">
        <portal to="rightDock">
            <citizen-org :citizen="citizen"/>
        </portal>
        <portal to="leftDock">
            <citizen-links :citizen="citizen"/>
            <citizen-tools @syncSuccess="syncSuccess" v-if="$auth.isAuthenticated && isOwner"/>
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
import CitizenTools from '@/components/citizen/CitizenTools.vue'

import Tabs from '@/components/layout/Tabs.vue'
import FleetView from '@/components/fleet/FleetView.vue'

export default {
    name: "citizen-main",
    props: ["citizen"],
    components: {
        CitizenOrg,
        CitizenLinks,
        CitizenTools,
        CitizenInfo,
        CitizenBio,
        FleetView,
        Tabs
    },
    computed: {
        isOwner() {
            const meta = this.$auth.user["https://uee.life/app_metadata"]
            if(meta && meta.handle == this.citizen.info.handle && meta.handle_verified) {
                return true
            }
            return false
        }
    },
    data() {
        return {
            tabs: ["info","ships"],
            initialTab: "info"
        }
    },
    methods: {
        syncSuccess() {
            this.$emit('refresh')
        }
    }
}
</script>

<style scoped>
    .citizen-main {
        width: 100%;
        padding: 10px;
        padding-top: 20px;
    }
</style>