<template>
    <div class="system">
        <portal to="leftDock">
          <dock-item title="nav">
            <div class="left-nav-button"><a target="_blank" :href="starmapLink">Open in Starmap</a></div>
            </dock-item>
        </portal>
        <location :location="location" type="System">
            <div class="location-tabs">
                <tabs :tabs="tabs" :initialTab="initialTab">
                    <template slot="tab-title-locations">
                        LOCATIONS ( {{children.length}} )
                    </template>
                    <template slot="tab-content-locations">
                        <location-list :locations="children"/>
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
import LocationList from '@/components/location/LocationList.vue'
import PoiList from '@/components/location/POIList.vue'

export default {
    layout: ({ isMobile }) => isMobile ? 'mobile' : 'default',
    name: "system",
    components: {
        Location,
        LocationList,
        PoiList
    },
    data() {
        return {
            tabs: ["locations", "pois"],
            initialTab: "locations",
            location: {},
            children: [],
            pois: []
        }
    },
    methods: {
        async getLocation() {
            const code = this.$route.params.location
            axios.get(`https://api.uee.life/locations/${code}`).then(res => {
                if(res.status == 200) {
                    this.location = res.data
                }
            }).catch(error => {
                // eslint-disable-next-line
                console.error(error)
            });
        },
        async getLocations() {
            const code = this.$route.params.location
            axios.get(`https://api.uee.life/locations/${code}/locations`).then(res => {
                if(res.status == 200) {
                    this.children = res.data
                }
            }).catch(error => {
                //eslint-disable-next-line
                console.error(error)
            });
        },
        async getPOIs() {
            const sid = this.$route.params.location
            axios.get(`https://api.uee.life/locations/${sid}/pois`).then(res => {
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
            if(this.location) {
                return `https://robertsspaceindustries.com/starmap?location=${this.location.code}`
            } else {
                return ""
            }
        },
        sysLink() {
            return `/system/${this.location.name}`
        }
    },
    mounted() {
        this.getLocation()
        this.getLocations()
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