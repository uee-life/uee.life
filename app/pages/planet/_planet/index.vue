<template>
    <div class="planet">
        <portal to="leftDock">
            <dock-item title="nav">
            <div v-if="planet" class="left-nav-button"><nuxt-link :to="systemLink">System: {{planet.system}}</nuxt-link></div>
            <div class="left-nav-button"><a target="_blank" :href="starmapLink">Open in Starmap</a></div>
            </dock-item>
            <location :location="planet" type="Planet"></location>
        </portal>
        <portal to="rightDock">
            
        </portal>
            <!--location :location="planet" type="Planet"-->
            <div class="location-tabs">
                <tabs :tabs="tabs" :initialTab="initialTab">
                    <template slot="tab-title-satellites">
                        MOONS ( {{ satellites.length }} )
                    </template>
                    <template slot="tab-content-satellites">
                        <moon-list :satellites="satellites" :link="planetLink"/>
                    </template>

                    <template slot="tab-title-pois">
                        POIs ( {{ pois.length }} )
                    </template>
                    <template slot="tab-content-pois">
                        <poi-list :pois="pois"/> 
                    </template>
                </tabs>
            </div>
        <!--/location-->
    </div>
</template>

<script>
import axios from "axios"

import Location from '@/components/location/Location.vue'
import MoonList from '@/components/location/MoonList.vue'
import PoiList from '@/components/location/POIList.vue'

export default {
    layout: ({ isMobile }) => isMobile ? 'mobile' : 'default',
    name: "planet",
    components: {
        Location,
        MoonList,
        PoiList
    },
    data() {
        return {
            tabs: ["satellites", "pois"],
            initialTab: "satellites",
            planet: {},
            satellites: [],
            pois: []
        }
    },
    methods: {
        async update() {
            this.getPlanet()
            this.getSatellites()
            this.getPOIs()
        },
        async getPlanet() {
            const planet = this.$route.params.planet
            axios.get(`https://api.uee.life/planets/${planet}`).then(res => {
                if(res.status == 200) {
                    this.planet = res.data
                }
            }).catch(error => {
                // eslint-disable-next-line
                console.error(error)
            });
        },
        async getSatellites() {
            const planet = this.$route.params.planet
            axios.get(`https://api.uee.life/planets/${planet}/satellites`).then(res => {
                if(res.status == 200) {
                    this.satellites = res.data
                }
            }).catch(error => {
                //eslint-disable-next-line
                console.error(error)
            });
        },
        async getPOIs() {
            const planet = this.$route.params.planet
            axios.get(`https://api.uee.life/planets/${planet}/pois`).then(res => {
                if(res.status == 200) {
                    this.pois = res.data
                }
            }).catch(error => {
                //eslint-disable-next-line
                console.error(error)
            })
        }
    },
    computed: {
        starmapLink() {
            if(this.planet) {
                let system = ""
                if (this.planet.system) {
                    system = this.planet.system.toUpperCase()
                }
                return `https://robertsspaceindustries.com/starmap?location=${this.planet.code}&system=${system}`
            } else {
                return ""
            }
        },
        systemLink() {
            return `/system/${this.planet.system}`
        },
        planetLink() {
            return `/planet/${this.planet.name}`
        }
    },
    mounted() {
        this.update()
    },
    watch: {
        $route: {
            handler: function () {
                this.update()
            }
        }
    }
}
</script>

<style scoped>
    .planet {
        width: 100%;
        display: flex;
        margin: 20px 10px 0;
    }
</style>