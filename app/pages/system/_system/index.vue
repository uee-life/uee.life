<template>
    <div class="system">
        <portal to="leftDock">
          <dock-item title="nav">
            <div class="left-nav-button"><a target="_blank" :href="starmapLink">Open in Starmap</a></div>
            </dock-item>
        </portal>
        <location :location="system" type="System">
            <div class="location-tabs">
                <tabs :tabs="tabs" :initialTab="initialTab">
                    <template slot="tab-title-planets">
                        PLANETS ( {{planets.length}} )
                    </template>
                    <template slot="tab-content-planets">
                        <planet-list :planets="planets"/>
                    </template>

                    <template slot="tab-title-pois">
                        POIs ( {{ pois.length }} )
                    </template>
                    <template slot="tab-content-pois">
                        <poi-list :pois="pois"/> 
                    </template>
                </tabs>
            </div>      
        </location>
    </div>
</template>

<script>
import axios from "axios"

import Location from '@/components/location/Location.vue'
import PlanetList from '@/components/location/PlanetList.vue'
import PoiList from '@/components/location/POIList.vue'

export default {
    layout: ({ isMobile }) => isMobile ? 'mobile' : 'default',
    name: "system",
    components: {
        Location,
        PlanetList,
        PoiList
    },
    data() {
        return {
            tabs: ["planets", "pois"],
            initialTab: "planets",
            system: {},
            planets: [],
            pois: []
        }
    },
    methods: {
        async getSystem() {
            const sid = this.$route.params.system
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
            const sid = this.$route.params.system
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
            const sid = this.$route.params.system
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
        $route: {
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