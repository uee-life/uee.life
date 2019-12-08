<template>
    <div class="location">
        <main-panel :title="type" mainClass="location-info">
            <h3> {{ location.name }} ( {{ location.affiliation }} )</h3>
            <p> {{ location.description }} </p>
        </main-panel>
        <slot></slot>
        <div v-if="debug">{{ JSON.stringify(location, null, 2) }}</div>
        <!--div class="org-tabs">
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
                    <org-members :members="members" />
                </template>
            </tabs>
        </div-->
    </div>
</template>

<script>

export default {
    name: 'location',
    props: ['location', 'type'],
    data() {
        return {
            tabs: ["info", "fleet", "members"],
            initialTab: "info",
            debug: true
        }
    },
    components: {
    },
    computed: {
        mainTitle() {
            return `${this.location.name} ${this.type} ( ${this.location.affiliation} )`
        }
    }
}
</script>

<style scoped>
    .location {
        width: 100%;
        padding: 10px;
        padding-top: 20px;
    }

    .location-info {
        margin-bottom: 30px;
    }
</style>