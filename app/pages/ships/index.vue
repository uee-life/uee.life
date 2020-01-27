<template>
    <div class="org-main" id="org-main">
        <fleet-view :ships="ships"/>
    </div>
</template>

<script>
import axios from "axios"
import { gsap } from 'gsap'

import FleetView from '@/components/fleet/FleetView.vue'

export default {
    layout: ({ isMobile }) => isMobile ? 'mobile' : 'default',
    name: "ships",
    components: {
        FleetView
    },
    data() {
        return {
            ships: [],
            search: ''
        }
    },
    methods: {
        getShips() {
            axios({
                url: 'https://api.uee.life/ships',
                method: 'GET'
            }).then((res) => {
                this.ships = res.data.ships
            }).catch((err) => {
                console.error(err)
            })
        }
    },
    mounted() {
        this.getShips()
    }
}
</script>

<style scoped>

</style>