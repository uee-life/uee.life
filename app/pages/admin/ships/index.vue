<template>
    <div class="org-main" id="org-main">
        <form v-if="$auth.hasScope('admin:all')" class="input-form" @submit.prevent="addShip">
            <span>short_name <input v-model="shipName" disabled/></span></span>
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
        <ship-list :ships="ships" :isAdmin="$auth.hasScope('admin:all')"/>
    </div>
</template>

<script>
import { gsap } from 'gsap'

import ShipList from '@/components/admin/ships/ShipList.vue'

export default {
    layout: ({ isMobile }) => isMobile ? 'mobile' : 'default',
    middleware: 'auth',
    name: "ships",
    components: {
        ShipList
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
    },
    computed: {
        shipName() {
            if(this.makes && this.ship.make && this.ship.model) {
                return (this.makes[this.ship.make - 1].abbr + "_" + this.ship.model.split(" ").join("_")).toUpperCase()
            } else {
                return "<select options below>"
            }
        }
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