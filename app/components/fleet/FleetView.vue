<template>
    <div id="fleet-view" class="fleet-view">
        <fleet-summary />
        <div class="view-controls">
            <div class="display-style">
                <template v-if="!isMobile">Display: <a @click="show('large')">Large</a> | <a @click="show('small')">Small</a> | <a @click="show('table')">Table</a></template>
            </div>
            <div class="filter">
                <input class="filter-box" type="text" v-model="search" placeholder="Filter list..." />
            </div>
        </div>
        <main-panel v-if="isOwner" class="add-ship" @click="showModal = true">
            ADD SHIP
        </main-panel>
        <div v-if="filteredShips.length > 0" class="ships">
            <template v-if="isMobile || display == 'small'">
                <ship-summary-small @selected="selected" v-for="(s, index) in filteredShips" :key="s.id" :ship="s" :index="index" :isOwner="isOwner" @remove="removeShip" />
            </template>
            <template v-else-if="display == 'table'">
                <ship-table  @selected="selected" :ships="filteredShips" />
            </template>
            <template v-else>
                <ship-summary @selected="selected" v-for="(s, index) in filteredShips" :key="s.id" :ship="s" :index="index" :isOwner="isOwner" @remove="removeShip"/>
            </template>
        </div>
        <div v-else class="no-ships">
            No ships currently listed
        </div>
        <modal v-if="showModal" title="Add Ship" @close="showModal = false">
            <ship-form @add="addShip" />
        </modal>
    </div>
</template>

<script>
import { gsap } from 'gsap'
import ShipSummary from '@/components/fleet/ShipSummary'
import ShipSummarySmall from '@/components/fleet/ShipSummarySmall'
import ShipTable from '@/components/fleet/ShipTable'
import ShipForm from '@/components/fleet/ShipForm'
import FleetSummary from '@/components/fleet/FleetSummary'

export default {
    name: "fleet-view",
    components: {
        ShipSummary,
        ShipSummarySmall,
        ShipTable,
        ShipForm,
        FleetSummary
    },
    props: {
        ships: {
            type: Array,
            default: function () {
                return []
            }
        },
        isOwner: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            display: 'large',
            search: '',
            showModal: false
        }
    },
    methods: {
        show(display) {
            this.display = display
        },
        selected(ship) {
            this.$emit('selected', ship)
        },
        addShip(ship) {
            this.showModal = false
            this.$emit('add', ship)
        },
        removeShip(ship) {
            this.$emit('remove', ship)
        }
    },
    computed: {
        filteredShips() {
            return this.ships.filter(ship => {
                return ship.make.toLowerCase().includes(this.search.toLowerCase()) ||
                    ship.short_name.toLowerCase().includes(this.search.toLowerCase()) ||
                    ship.model.toLowerCase().includes(this.search.toLowerCase())
            })
        }
    },
    mounted() {
        gsap.to(".ships", {duration: 1, opacity: 1})
    }
}
</script>

<style scoped>
    .view-controls {
        margin: 5px;
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
    }
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
    .no-ships {
        text-align: center;
        font-size: 18px;
        color: #dbf3ff;
    }
    .ships {
        display: flex;
        flex-wrap: wrap;
        opacity: 1;
    }
</style>