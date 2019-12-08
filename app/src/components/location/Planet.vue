<template>
    <div class="planet">
        <left-dock />
        <portal to="navigationPane">
            <div class="left-nav-button"><router-link :to="systemLink">{{planet.system}} system</router-link></div>
            <div class="left-nav-button"><a target="_blank" :href="starmapLink">Starmap Link</a></div>
        </portal>
        <location :location="planet" type="Planet">
            <moon-list :sattelites="sattelites" />
        </location>
        <right-dock />
    </div>
</template>

<script>
import axios from "axios"

import LeftDock from '@/components/layout/LeftDock.vue'
import RightDock from '@/components/layout/RightDock.vue'
import Location from '@/components/location/Location.vue'
import MoonList from '@/components/location/MoonList.vue'

export default {
    name: "system",
    components: {
        LeftDock,
        RightDock,
        Location,
        MoonList
    },
    data() {
        return {
            planet: {},
            sattelites: []
        }
    },
    methods: {
        async getPlanet() {
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
        async getSattelites() {
            const sid = this.$route.params.system
            const planet = this.$route.params.planet
            axios.get(`https://api.uee.life/system/${sid}/planets/${planet}/sattelites`).then(res => {
                if(res.status == 200) {
                    this.sattelites = res.data
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
        this.getSattelites()
    },
    watch: {
        route: {
            handler: function () {
                this.getPlanet();
                this.getSattelites();
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