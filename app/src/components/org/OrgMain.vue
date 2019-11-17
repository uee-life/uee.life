<template>
    <div class="org-main" id="org-main">
        <org-banner :org="org" />
        <div>
            <tabs :tabs="tabs" :initialTab="initialTab">
                <template slot="tab-title-info">
                    INFO
                </template>
                <template slot="tab-content-info">
                    <org-details :org="org" />
                </template>

                <template slot="tab-title-fleet">
                    FLEET
                </template>
                <template slot="tab-content-fleet">
                    <fleet-view :ships="fleet"/>
                </template>
            </tabs>
        </div>
    </div>
</template>

<script>
import OrgBanner from '@/components/org/OrgBanner.vue'
import OrgDetails from '@/components/org/OrgDetails.vue'
import Tabs from '@/components/layout/Tabs.vue'
import FleetView from '@/components/fleet/FleetView.vue'

export default {
    name: 'org-main',
    props: ['org', 'fleet'],
    data() {
        return {
            tabs: ["info","fleet"],
            initialTab: "info"
        }
    },
    components: {
        OrgBanner,
        OrgDetails,
        Tabs,
        FleetView
    }
}
</script>

<style>
    .org-main {
        width: 100%;
        padding-top: 10px;
    }
</style>