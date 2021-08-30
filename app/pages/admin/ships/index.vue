<template>
    <div class="org-main" id="org-main">
        <main-panel class="add-ship" @click="showModal = true">
            ADD SHIP
        </main-panel>
        <modal v-if="showModal" title="Add Ship" @close="showModal = false">
            <add-ship @add="addShip" />
        </modal>
        <ship-list :ships="ships" :isAdmin="$auth.hasScope('admin:all')"/>
    </div>
</template>

<script>
import { gsap } from 'gsap'

import AddShip from '@/components/admin/ships/AddShip.vue'
import ShipList from '@/components/admin/ships/ShipList.vue'

export default {
    layout: ({ isMobile }) => isMobile ? 'mobile' : 'default',
    middleware: 'auth',
    name: "ships",
    components: {
        ShipList,
        AddShip
    },
    data() {
        return {
            ships: [],
            search: '',
            focus: null,
            types: null,
            makes: null,
            sizes: null,
            showModal: false
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
        addShip(ship) {
            this.showModal = false
            console.log(ship)
            return
            /* add the ship
            this.$axios({
                url: 'https://api.uee.life/ships',
                method: 'POST',
                headers: {
                    'Content-Type': "application/json; charset=utf-8"
                },
                data: ship
            }).then((res) => {
                this.$swal.fire('Success!', 'Successfully added ship!', 'success')
                this.getShips()
            }).catch((err) => {
                this.$swal.fire('Error!', err, 'error')
            })*/
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