<template>
    <div class="org-main" id="org-main">
        <input type="text" v-model="search" placeholder="Search..." />
        <fleet-view :ships="filteredList"/>
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
    computed: {
        filteredList() {
            return this.ships.filter(ship => {
                return ship.make.toLowerCase().includes(this.search.toLowerCase()) ||
                    ship.short_name.toLowerCase().includes(this.search.toLowerCase()) ||
                    ship.model.toLowerCase().includes(this.search.toLowerCase())
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