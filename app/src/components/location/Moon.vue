<template>
    <div class="satellite">
        <left-dock />
        <portal to="navigationPane">
            <div v-if="satellite" class="left-nav-button"><router-link :to="systemLink">{{satellite.system}} system</router-link></div>
            <div class="left-nav-button"><a target="_blank" :href="starmapLink">Starmap Link</a></div>
        </portal>
        <location :location="satellite" type="Satellite">
            <moon-list :satellites="satellites" :planet="planet.name"/>
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
    name: "system",
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
        async getSattelite() {
            const sid = this.$route.params.system
            const planet = this.$route.params.planet
            axios.get(`https://api.uee.life/system/${sid}/planets/${planet}`).then(res => {
                if(res.status == 200) {
                    this.planet = res.data
                }
            }).catch(error => {
                // eslint-disable-next-line
                console.error(error)
            });
        },
        async getSatellites() {
            const sid = this.$route.params.system
            const planet = this.$route.params.planet
            axios.get(`https://api.uee.life/system/${sid}/planets/${planet}/satellites`).then(res => {
                if(res.status == 200) {
                    this.satellites = res.data
                }
            }).catch(error => {
                //eslint-disable-next-line
                console.error(error)
            });
        }
    },
    computed: {
        starmapLink() {
            if(this.planet) {
                return `https://robertsspaceindustries.com/starmap?location=${this.planet.code}&system=${this.planet.system}`
            } else {
                return ""
            }
        },
        systemLink() {
            return `/system/${this.planet.system}`
        }
    },
    mounted() {
        this.getPlanet()
        this.getSatellites()
    },
    watch: {
        route: {
            handler: function () {
                this.getPlanet();
                this.getSatellites();
            }
        }
    }
}
</script>

<style scoped>
    .planet {
        width: 100%;
        display: flex;
    }
</style>