<template>
    <div class="ship-list">
        <div class="view-controls">
            <div class="display-style" v-if="showControls">
                <template v-if="!isMobile">Display: <a @click="show('large')">Large</a> | <a @click="show('small')">Small</a> | <a @click="show('table')">Table</a></template>
            </div>
            <div class="filter">
                <input class="filter-box" type="text" v-model="search" placeholder="Filter list..." />
            </div>
        </div>
        <div v-if="ships.length > 0" class="ships">
            <template v-if="isMobile || display == 'small'">
                <ship-summary-small @selected="showShip(s)" v-for="(s, index) in filteredShips" :key="s.id" :ship="s" :index="index" :isAdmin="isAdmin" @remove="remove" />
            </template>
            <template v-else-if="display == 'table'">
                <ship-table  @selected="showShip(s)" :ships="filteredShips" />
            </template>
            <template v-else>
                <ship-summary @selected="showShip(s)" v-for="(s, index) in filteredShips" :key="s.id" :ship="s" :index="index" :isAdmin="isAdmin" @remove="remove"/>
            </template>
        </div>
        <div v-else class="no-ships">
                No ships currently listed!
        </div>
        <modal v-if="shipModal" title="Ship Info" @close="shipModal = false">
            <ship :ship="selected" @remove="remove" @update="update" :canEdit="true"/>
        </modal>
    </div>
</template>

<script>
import { gsap } from 'gsap'
import ShipSummary from '@/components/admin/ships/ShipSummary'
import ShipSummarySmall from '@/components/fleet/ShipSummarySmall'
import ShipTable from '@/components/admin/ships/ShipTable'
import Ship from '@/components/admin/ships/Ship'

export default {
    name: 'ShipList',
    components: {
        ShipSummary,
        ShipSummarySmall,
        ShipTable,
        Ship
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
        showControls: {
            type: Boolean,
            default: true
        },
        showFilter: {
            type: Boolean,
            default: true
        },
        showOwner: {
            type: Boolean,
            default: false
        },
        isAdmin: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            search: '',
            display: 'large',
            shipModal: false,
            selected: null
        }
    },
    computed: {
        filteredShips() {
            return this.ships.filter(ship => {
                return ship.make.toLowerCase().includes(this.search.toLowerCase()) ||
                    ship.short_name.toLowerCase().includes(this.search.toLowerCase()) ||
                    ship.model.toLowerCase().includes(this.search.toLowerCase()) ||
                    ship.type.toLowerCase().includes(this.search.toLowerCase()) ||
                    ship.focus.toLowerCase().includes(this.search.toLowerCase()) ||
                    ship.size.toLowerCase().includes(this.search.toLowerCase())
            })
        }
    },
    methods: {
        show(display) {
            this.display = display
        },
        remove(ship) {
            this.$emit('remove', ship)
        },
        update(ship) {
            this.$emit('update', ship)
        },
        showShip(s) {
            this.selected = s
            this.shipModal = true
        }
    },
    mounted() {
        this.display = this.view
        gsap.to(".ships", {duration: 1, opacity: 1})
    }
}
</script>

<style>
    .view-controls {
        margin: 5px;
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
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