<template>
    <div class="system">
        <left-dock />
        <portal to="navigationPane">
            <div class="left-nav-button"><a target="_blank" :href="starmapLink">Starmap Link</a></div>
        </portal>
        <location :location="system" type="System">
            <planet-list :planets="planets"/>
            <poi-list :pois="pois"/>        
        </location>
        <right-dock />
        <!--fleet-view :ships="ships" /-->
    </div>
</template>

<script>
import axios from "axios"

import LeftDock from '@/components/layout/LeftDock.vue'
import RightDock from '@/components/layout/RightDock.vue'
import Location from '@/components/location/Location.vue'
import PlanetList from '@/components/location/PlanetList.vue'
import PoiList from '@/components/location/POIList.vue'

export default {
    name: "system",
    components: {
        LeftDock,
        RightDock,
        Location,
        PlanetList,
        PoiList
    },
    data() {
        return {
            system: {},
            planets: [],
            pois: []
        }
    },
    methods: {
        async getSystem() {
            const sid = this.$route.params.code
            axios.get(`https://api.uee.life/systems/${sid}`).then(res => {
                if(res.status == 200) {
                    this.system = res.data
                }
            }).catch(error => {
                // eslint-disable-next-line
                console.error(error)
            });
        },
        async getPlanets() {
            const sid = this.$route.params.code
            axios.get(`https://api.uee.life/systems/${sid}/planets`).then(res => {
                if(res.status == 200) {
                    this.planets = res.data
                }
            }).catch(error => {
                //eslint-disable-next-line
                console.error(error)
            });
        },
        async getPOIs() {
            const sid = this.$route.params.code
            axios.get(`https://api.uee.life/systems/${sid}/pois`).then(res => {
                if(res.status == 200) {
                    this.pois = res.data
                }
            }).catch(error => {
                // eslint-disable-next-line
                console.error(error)
            })
        }
    },
    computed: {
        starmapLink() {
            if(this.system) {
                return `https://robertsspaceindustries.com/starmap?location=${this.system.code}`
            } else {
                return ""
            }
        },
        sysLink() {
            return `/system/${this.system.name}`
        }
    },
    mounted() {
        this.getSystem()
        this.getPlanets()
        this.getPOIs()
    },
    watch: {
        route: {
            handler: function () {
                this.getSystem()
                this.getPlanets()
                this.getPOIs()
            }
        }
    }
}
</script>

<style scoped>
    .system {
        width: 100%;
        display: flex;
    }
</style>