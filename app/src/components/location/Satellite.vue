<template>
    <div class="satellite">
        <left-dock />
        <portal to="navigationPane">
            <div v-if="satellite" class="left-nav-button"><router-link :to="systemLink">System: {{satellite.system}}</router-link></div>
            <div v-if="satellite" class="left-nav-button"><router-link :to="planetLink">Planet: {{satellite.planet}}</router-link></div>
            <div class="left-nav-button"><a target="_blank" :href="starmapLink">Open in Starmap</a></div>
        </portal>
        <location :location="satellite" type="Satellite">
        </location>
        <right-dock />
    </div>
</template>

<script>
import axios from "axios"

import LeftDock from '@/components/layout/LeftDock.vue'
import RightDock from '@/components/layout/RightDock.vue'
import Location from '@/components/location/Location.vue'

export default {
    name: "satellite",
    components: {
        LeftDock,
        RightDock,
        Location
    },
    data() {
        return {
            satellite: {}
        }
    },
    methods: {
        async getSatellite() {
            const moon = this.$route.params.moon
            axios.get(`https://api.uee.life/satellites/${moon}`).then(res => {
                if(res.status == 200) {
                    this.satellite = res.data
                }
            }).catch(error => {
                // eslint-disable-next-line
                console.error(error)
            });
        }
    },
    computed: {
        starmapLink() {
            if(this.satellite) {
                return `https://robertsspaceindustries.com/starmap?location=${this.satellite.code}&system=${this.satellite.system}`
            } else {
                return ""
            }
        },
        systemLink() {
            return `/system/${this.satellite.system}`
        },
        planetLink() {
            return `/planet/${this.satellite.planet}`
        }
    },
    mounted() {
        this.getSatellite()
    },
    watch: {
        $route: {
            handler: function () {
                this.getSatellite();
            }
        }
    }
}
</script>

<style scoped>
    .satellite {
        width: 100%;
        display: flex;
    }
</style>