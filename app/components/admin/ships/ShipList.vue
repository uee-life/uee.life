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
        <main-panel class="add-ship" @click="modals.add = true">
            ADD SHIP
        </main-panel>
        <div v-if="ship_data.ships.length > 0" class="ships">
            <template v-if="isMobile || display == 'small'">
                <ship-summary-small @selected="showShip(s)" v-for="(s, index) in filteredShips" :key="s.id" :ship="s" :index="index" :isAdmin="isAdmin"/>
            </template>
            <template v-else-if="display == 'table'">
                <ship-table  @selected="showShip(s)" :ships="filteredShips" />
            </template>
            <template v-else>
                <ship-summary @selected="showShip(s)" v-for="(s, index) in filteredShips" :key="s.id" :ship="s" :index="index" :isAdmin="isAdmin" @remove="remove" @edit="modals.edit = true" />
            </template>
        </div>
        <div v-else class="no-ships">
                No ships currently listed!
        </div>
        <!-- Modals ------------------------------>
        <modal v-if="modals.add" title="Add Ship" @close="modals.add = false">
            <ship-form @add="addShip" />
        </modal>
        <modal v-if="modals.info" title="Ship Info" @close="modals.info = false">
            <ship :ship="mergedSelected" @remove="remove" :canEdit="true"/>
        </modal>
        <modal v-if="modals.edit" title="Edit Ship" @close="modals.edit = false">
            <ship-form :ship="mergedSelected" @edit="edit" :editing="true" />
        </modal>
    </div>
</template>

<script>
import { gsap } from 'gsap'
import ShipSummary from '@/components/admin/ships/ShipSummary'
import ShipSummarySmall from '@/components/fleet/ShipSummarySmall'
import ShipTable from '@/components/admin/ships/ShipTable'
import Ship from '@/components/admin/ships/Ship'
import ShipForm from '@/components/admin/ships/ShipForm.vue'

export default {
    name: 'ShipList',
    components: {
        ShipSummary,
        ShipSummarySmall,
        ShipTable,
        Ship,
        ShipForm
    },
    props: {
        /*ship_data: {
            type: Object,
            default: function () {
                return {
                    ships: [],
                    focus: null,
                    types: null,
                    makes: null,
                    sizes: null
                }
            }
        },*/
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
            modals: {
                info: false,
                edit: false,
                add: false
            },
            ship_data: {
                ships: [],
                focus: null,
                types: null,
                makes: null,
                sizes: null
            },
            selected: {},
            ship_template: {
                id: 0,
                name: null,
                make: 1,
                model: null,
                size: null,
                crew: null,
                cargo: 0,
                type: null,
                focus: null,
                performance: {
                    speed: 0,
                    yaw: 0,
                    pitch: 0,
                    roll: 0,
                },
                equipment: {
                    weapons: {s1: 0, s2: 0, s3: 0, s4: 0, s5: 0, s6: 0, s7: 0},
                    turrets: {s1: 0, s2: 0, s3: 0, s4: 0, s5: 0, s6: 0, s7: 0},
                    missiles: { s1: 0, s2: 0, s3: 0, s4: 0, s5: 0, s9: 0},
                    shields: {s1: 0, s2: 0, s3: 0, s4: 0, s5: 0},
                }
            },
        }
    },
    computed: {
        filteredShips() {
            return this.ship_data.ships.filter(ship => {
                return ship.short_name.toLowerCase().includes(this.search.toLowerCase())
            })
        },
        mergedSelected() {
            return {
                ...this.ship_template,
                ...this.selected
            }
        }
    },
    methods: {
        getShips() {
            this.$axios({
                url: 'https://api.uee.life/ships',
                method: 'GET'
            }).then((res) => {
                this.ship_data = res.data
                for(var s in this.ship_data.ships) {
                    this.ship_data.ships[s].performance = JSON.parse(this.ship_data.ships[s].performance)
                    this.ship_data.ships[s].equipment = JSON.parse(this.ship_data.ships[s].equipment)
                }
            }).catch((err) => {
                console.error(err)
            })
        },
        show(display) {
            this.display = display
        },
        remove(ship) {
            this.$emit('remove', ship)
        },
        edit(ship) {
            this.selected = ship
            this.modals.edit = false
            console.log(ship)
        },
        showShip(s) {
            this.selected = s
            this.modals.info = true
        },
        addShip(ship) {
            this.modals.add = false
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