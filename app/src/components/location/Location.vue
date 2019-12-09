<template>
    <div class="location">
        <main-panel :title="location.name" mainClass="location-panel">
            <div class="location-info">
                <h3> {{ location.name }} ( {{type}} )</h3>
                <p>
                    <span v-if="location.subtype">Type: <span class='value'>{{location.subtype}}</span><br></span>
                    Affiliation: <span class='value'>{{location.affiliation}}</span><br>
                    Habitable: <span class='value'>{{isHabitable}}</span><br>
                    Population: <span class='value'>{{rating(location.population)}}</span><br>
                    Risk: <span class='value'>{{rating(location.danger)}}</span><br>
                </p>
                <p>{{ location.description }}</p>
            </div>
            <img class="location-image" v-if="location.thumbnail" :src="location.thumbnail"/>
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
            debug: false
        }
    },
    components: {
    },
    computed: {
        mainTitle() {
            return `${this.location.name} ${this.type} ( ${this.location.affiliation} )`
        },
        isHabitable() {
            if(location.habitable) {
                return 'Yes'
            } else {
                return 'No'
            }
        }
    },
    methods: {
        rating(metric) {
            if(metric >= 9) {
                return "Extreme"
            } else if(metric >= 7) {
                return "Very High"
            } else if(metric >= 5) {
                return "Medium"
            } else if(metric >= 3) {
                return "Low"
            } else if(metric >= 1) {
                return "Very Low"
            } else {
                return "None"
            }
        }
    }
}
</script>

<style>
    .location {
        width: 100%;
        padding: 10px;
        padding-top: 20px;
    }

    .location-panel .content {
        display: flex;
    }

    .location-image {
        flex-basis: 300px;
        height: 300px;
        border: 1px dotted #546f84;
    }

    .location-info {
        margin-bottom: 30px;
        margin: 0 20px;
    }

    .location-info .value {
        color: #dbf3ff;
    }
</style>