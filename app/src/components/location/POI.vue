<template>
    <div class="poi">
        <left-dock />
        <portal to="navigationPane">
            <div v-if="poi" class="left-nav-button"><router-link :to="systemLink">System: {{poi.system}}</router-link></div>
            <div v-if="poi" class="left-nav-button"><router-link :to="planetLink">Planet: {{poi.planet}}</router-link></div>
            <div class="left-nav-button"><a target="_blank" :href="starmapLink">Open in Starmap</a></div>
        </portal>
        <location :location="poi" type="POI">
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
    name: "poi",
    components: {
        LeftDock,
        RightDock,
        Location
    },
    data() {
        return {
            poi: {}
        }
    },
    methods: {
        async getPoi() {
            const poi = this.$route.params.poi
            axios.get(`https://api.uee.life/pois/${poi}`).then(res => {
                if(res.status == 200) {
                    this.poi = res.data
                }
            }).catch(error => {
                // eslint-disable-next-line
                console.error(error)
            });
        }
    },
    computed: {
        starmapLink() {
            if(this.poi) {
                return `https://robertsspaceindustries.com/starmap?location=${this.poi.code}&system=${this.poi.system}`
            } else {
                return ""
            }
        },
        systemLink() {
            return `/system/${this.poi.system}`
        },
        planetLink() {
            return `/planet/${this.poi.planet}`
        }
    },
    mounted() {
        this.getPoi()
    },
    watch: {
        route: {
            handler: function () {
                this.getPoi();
            }
        }
    }
}
</script>

<style scoped>
    .poi {
        width: 100%;
        display: flex;
    }
</style>