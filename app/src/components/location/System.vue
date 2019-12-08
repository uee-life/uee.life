<template>
    <div class="system">
        <left-dock />
        <portal to="navigationPane">
            <div class="left-nav-button"><router-link to="/orgs">Search Orgs</router-link></div>
            <div class="left-nav-button"><a target="_blank" :href="starmapLink">starmap</a></div>
        </portal>
        <location :location="system" type="System"/>
        <right-dock />
        <!--fleet-view :ships="ships" /-->
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
            system: {}
        }
    },
    methods: {
        async getSystem() {
            const sid = this.$route.params.code
            axios.get(`https://api.uee.life/system/${sid}`).then(res => {
                if(res.status == 200) {
                    this.system = res.data
                }
            }).catch(error => {
                // eslint-disable-next-line
                console.error(error)
            });
        }
    },
    computed: {
        starmapLink() {
            if(this.system) {
                return `https://robertsspaceindustries.com/starmap?location=${this.system.code}`
            } else {
                return ""
            }
        }
    },
    mounted() {
        this.getSystem()
    },
    watch: {
        route: {
            handler: function () {
                this.getSystem();
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