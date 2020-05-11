<template>
    <div id="fleet-view" class="fleet-view">
        <fleet-summary v-if="showSummary" @filter="setFilter" :fleet="ships"/>
        <ship-list :ships="filteredShips" @selected="selected" @remove="removeShip" :isAdmin="isOwner"/>
        <main-panel v-if="isOwner" class="add-ship" @click="showModal = true">
            ADD SHIP
        </main-panel>
        <modal v-if="showModal" title="Add Ship" @close="showModal = false">
            <ship-form @add="addShip" />
        </modal>
    </div>
</template>

<script>
import { gsap } from 'gsap'

import ShipForm from '@/components/fleet/ShipForm'
import FleetSummary from '@/components/fleet/FleetSummary'
import ShipList from '@/components/fleet/ShipList'

export default {
    name: "fleet-view",
    components: {
        ShipForm,
        FleetSummary,
        ShipList
    },
    props: {
        ships: {
            type: Array,
            default: function () {
                return []
            }
        },
        view: {
            type: String,
            default: 'large'
        },
        isOwner: {
            type: Boolean,
            default: false
        },
        showSummary: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            showModal: false,
            search: ''
        }
    },
    methods: {
        selected(ship) {
            this.$router.push(`/ships/${this.shipID(ship)}`)
            //this.$emit('selected', ship)
        },
        addShip(ship) {
            this.showModal = false
            this.$emit('add', ship)
        },
        removeShip(ship) {
            this.$emit('remove', ship)
        },
        setFilter(value) {
            this.search = value
        }
    },
    computed: {
        filteredShips() {
            console.log(this.ships)
            return this.ships.filter(ship => {
                return ship.make.toLowerCase().includes(this.search.toLowerCase()) ||
                    ship.short_name.toLowerCase().includes(this.search.toLowerCase()) ||
                    ship.model.toLowerCase().includes(this.search.toLowerCase()) ||
                    ship.type.toLowerCase().includes(this.search.toLowerCase()) ||
                    ship.focus.toLowerCase().includes(this.search.toLowerCase()) ||
                    ship.size.toLowerCase().includes(this.search.toLowerCase())
            })
        }
    }
}
</script>

<style scoped>
    .display-style {
    }
    .add-ship {
        margin: 6px;
        text-align: center;
        cursor: pointer;
    }
    .fleet-view {
        position: relative;
        margin-bottom: 20px;
        margin-left: -5px;
        margin-right: -5px;
    }
    .fleet-view a {
        cursor: pointer;
    }

</style>