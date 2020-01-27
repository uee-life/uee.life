<template>
    <div id="fleet-view" class="fleet-view">
        <div class="display-style"><template v-if="!isMobile">Display: <a @click="show('large')">Large</a> | <a @click="show('small')">Small</a> | <a @click="show('table')">Table</a> | </template><input type="text" v-model="search" placeholder="Filter list..." /></div>
        <div v-if="filteredShips.length > 0" class="ships">
            <template v-if="isMobile || display == 'small'">
                <ship-summary-small v-for="(s, index) in filteredShips" :key="s.id" :ship="s" :index="index" />
            </template>
            <template v-else-if="display == 'table'">
                <ship-table :ships="filteredShips" />
            </template>
            <template v-else>
                <ship-summary v-for="(s, index) in filteredShips" :key="s.id" :ship="s" :index="index" />
            </template>
        </div>
        <div v-else class="no-ships">
            No ships currently listed
        </div>
    </div>
</template>

<script>
import { gsap } from 'gsap'
import ShipSummary from '@/components/fleet/ShipSummary'
import ShipSummarySmall from '@/components/fleet/ShipSummarySmall'
import ShipTable from '@/components/fleet/ShipTable'

export default {
    name: "fleet-view",
    components: {
        ShipSummary,
        ShipSummarySmall,
        ShipTable
    },
    props: {
        ships: {
            type: Array,
            default: function () {
                return []
            }
        }
    },
    data() {
        return {
            display: 'large',
            search: ''
        }
    },
    methods: {
        show(display) {
            this.display = display
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
    .display-style {
        margin-bottom: 10px;
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