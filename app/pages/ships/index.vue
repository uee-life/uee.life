<template>
    <div class="org-main" id="org-main">
        <form class="input-form" @submit.prevent="addShip">
            <span>short_name <input v-model="ship.name" /></span></span>
            <span>manufacturer: <select v-model="ship.make">
                <option v-for="f in makes" :key="f.id" :value="f.id">{{ f.name }}</option>
            </select></span>
            <span>model        <input v-model="ship.model" /></span>
            <span>size         <select v-model="ship.size">
                <option v-for="s in sizes" :key="s.id" :value="s.id">{{ s.size }}</option>
            </select></span>
            <span>max_crew    <input v-model="ship.crew" /></span>
            <span>cargo  <input v-model="ship.cargo" /></span>
            <span>type   <select v-model="ship.type">
                <option v-for="f in types" :key="f.id" :value="f.id">{{ f.type }}</option>
            </select></span>
            <span>focus: <select v-model="ship.focus">
                <option v-for="f in focus" :key="f.id" :value="f.id">{{ f.focus }}</option>
            </select></span>
            <button type="submit">Add Ship</button>
        </form>
        <div>{{ship.name}}, {{ship.make}}, {{ship.model}}, {{ship.size}}, {{ship.crew}}, {{ship.cargo}}, {{ship.type}}, {{ship.focus}}</div>
        <fleet-view :ships="ships"/>
    </div>
</template>

<script>
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
            search: '',
            focus: null,
            types: null,
            makes: null,
            sizes: null,
            ship: {
                name: null,
                make: null,
                model: null,
                size: null,
                crew: null,
                cargo: null,
                type: null,
                focus: null,
            }
        }
    },
    methods: {
        getShips() {
            this.$axios({
                url: 'https://api.uee.life/ships',
                method: 'GET'
            }).then((res) => {
                this.ships = res.data.ships
                this.focus = res.data.focus
                this.types = res.data.types
                this.makes = res.data.makes
                this.sizes = res.data.sizes
            }).catch((err) => {
                console.error(err)
            })
        },
        addShip() {

            this.$axios({
                url: 'https://api.uee.life/ships',
                method: 'POST',
                headers: {
                    'Content-Type': "application/json; charset=utf-8"
                },
                data: this.ship
            }).then((res) => {
                this.$swal.fire('Success!', 'Successfully added ship!', 'success')
                this.getShips()
            }).catch((err) => {
                this.$swal.fire('Error!', err, 'error')
            })
        }
    },
    mounted() {
        this.getShips()
    }
}
</script>

<style scoped>
    .input-form {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .input-form span {
        width: 100%;
    }
</style>