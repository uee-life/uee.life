<template>
    <div class="org-main" id="org-main">
        <org-banner :org="org" />
        <div class="org-tabs">
            <tabs :tabs="tabs" :initialTab="initialTab">
                <template slot="tab-title-info">
                    INFO
                </template>
                <template slot="tab-content-info">
                    <org-info :org="org" />
                </template>

                <template slot="tab-title-fleet">
                    FLEET
                </template>
                <template slot="tab-content-fleet">
                    <fleet-view :ships="fleet"/>
                </template>

                <template slot="tab-title-members">
                    MEMBERS
                </template>
                <template slot="tab-content-members">
                    Coming Soon...
                </template>
            </tabs>
        </div>
    </div>
</template>

<script>
import OrgBanner from '@/components/org/OrgBanner.vue'
import OrgInfo from '@/components/org/OrgInfo.vue'
import FleetView from '@/components/fleet/FleetView.vue'

export default {
    name: 'org-main',
    props: ['org', 'fleet'],
    data() {
        return {
            tabs: ["info", "fleet", "members"],
            initialTab: "info"
        }
    },
    components: {
        OrgBanner,
        OrgInfo,
        FleetView
    }
}
</script>

<style>
    .org-main {
        width: 100%;
        padding: 10px;
        padding-top: 20px;
    }
</style>