<template>
    <form v-if="$auth.hasScope('admin:all')" class="input-form" @submit.prevent="addShip()">
        <div class="panels">
        <main-panel class="modal-panel" title="Basic Info">
            <span>short_name <input class="modal-input" v-model="shipName" disabled/></span>
            <span>manufacturer: <select class="modal-input" v-model="ship_data.make" :disabled="editing">
                <option v-for="f in makes" :key="f.id" :value="f.id">{{ f.name }}</option>
            </select></span>
            <span>model        <input class="modal-input" v-model="ship_data.model" /></span>
            <span>max_crew    <input class="modal-input" v-model.number="ship_data.crew" type="number"/></span>
            <span>type   <select class="modal-input" v-model="ship_data.type">
                <option v-for="f in types" :key="f.id" :value="f.id">{{ f.type }}</option>
            </select></span>
            <span>focus: <select class="modal-input" v-model="ship_data.focus">
                <option v-for="f in focus" :key="f.id" :value="f.id">{{ f.focus }}</option>
            </select></span>
        </main-panel>
        <main-panel class="modal-panel" title="Ship Stats">
            <span>size <select class="modal-input" v-model="ship_data.size">
                <option v-for="s in sizes" :key="s.id" :value="s.id">{{s.id}} - {{ s.size }}</option>
            </select></span>
            <span>Cargo <input class="modal-input" v-model.number="ship_data.cargo" type="number" /></span>
            <span>Speed <input class="modal-input" v-model.number="ship_data.performance.speed" type="number" /></span>
            <span>Yaw <input class="modal-input" v-model.number="ship_data.performance.yaw" type="number" /></span>
            <span>Pitch <input class="modal-input" v-model.number="ship_data.performance.pitch" type="number" /></span>
            <span>Roll <input class="modal-input" v-model.number="ship_data.performance.roll" type="number" /></span>
        </main-panel>
        <main-panel class="modal-panel" title="Ship Equipment">
            <span>Weapons 
                <span class="array-input">
                    <select class="modal-select" v-model="edit.weapons">
                        <option v-for="s in Object.keys(ship_data.equipment.weapons)" :key="s" :value="s">{{ s }}</option>
                    </select>
                    <input class="modal-button" type="button" value="add" @click="editItem('weapons', 'add')"/>
                    <input class="modal-button" type="button" value="remove" @click="editItem('weapons', 'remove')"/>
                </span>
            </span>
            <span>Turrets       
                <span class="array-input">         
                    <select class="modal-select" v-model="edit.turrets">
                        <option v-for="s in Object.keys(ship_data.equipment.turrets)" :key="s" :value="s">{{ s }}</option>
                    </select>
                    <input class="modal-button" type="button" value="add" @click="editItem('turrets', 'add')" />
                    <input class="modal-button" type="button" value="remove" @click="editItem('turrets', 'remove')"/>
                </span>
            </span>
            <span>Missiles
                <span class="array-input">
                    <select class="modal-select" v-model="edit.missiles">
                        <option v-for="s in Object.keys(ship_data.equipment.missiles)" :key="s" :value="s">{{ s }}</option>
                    </select>
                    <input class="modal-button" type="button" value="add" @click="editItem('missiles', 'add')" />
                    <input class="modal-button" type="button" value="remove" @click="editItem('missiles', 'remove')"/>
                </span>
            </span>
            <span>Shields
                <span class="array-input">
                    <select class="modal-select" v-model="edit.shields">
                        <option v-for="s in Object.keys(ship_data.equipment.shields)" :key="s" :value="s">{{ s }}</option>
                    </select>
                    <input class="modal-button" type="button" value="add" @click="editItem('shields', 'add')" />
                    <input class="modal-button" type="button" value="remove" @click="editItem('shields', 'remove')"/>
                </span>
            </span>
            <span>
                <div v-for="t in Object.keys(ship_data.equipment)" :key="t">
                    {{t}}: <span v-for="i in Object.keys(ship_data.equipment[t])" :key="i">
                        <span v-if="ship_data.equipment[t][i] > 0">{{ship_data.equipment[t][i]}}x{{i.toUpperCase()}} </span>
                    </span>
                </div>
            </span>
        </main-panel>
        </div>
        <button type="submit">Add Ship</button>
    </form>
</template>

<script>
export default {
    layout: ({ isMobile }) => isMobile ? 'mobile' : 'default',
    middleware: 'auth',
    name: 'ShipForm',
    props: {
        ship: {
            type: Object,
            default: function() {
                return {}
            }
        },
        editing: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            ships: null,
            makes: null,
            focus: null,
            types: null,
            sizes: null,
            ship_data: {
                id: 0,
                name: null,
                make: 1,
                model: null,
                size: null,
                crew: 1,
                cargo: 0,
                type: null,
                focus: null,
                equipment: {
                    weapons: {emp: 0, s1: 0, s2: 0, s3: 0, s4: 0, s5: 0, s6: 0, s7: 0, s8: 0, s9: 0, s10: 0},
                    turrets: {s1: 0, s2: 0, s3: 0, s4: 0, s5: 0, s6: 0, s7: 0, s8: 0, s9: 0, s10: 0},
                    missiles: {s1: 0, s2: 0, s3: 0, s4: 0, s5: 0, s9: 0},
                    shields: {s1: 0, s2: 0, s3: 0, s4: 0, s5: 0, s6: 0},
                },
                performance: {
                    speed: 0,
                    yaw: 0,
                    pitch: 0,
                    roll: 0,
                }
            },
            edit: {
                weapons: "s1",
                turrets: "s1",
                missiles: "s1",
                shields: "s1"
            }
        }
    },
    methods: {
        addShip() {
            console.log('submit clicked')
            this.ship_data.name = this.shipName
            if (this.editing) {
                this.$emit('edit', this.ship_data)
            } else {
                this.$emit('add', this.ship_data)
            }
        },
        getShips() {
            this.$axios({
                url: 'https://api.uee.life/ships',
                method: 'GET'
            }).then((res) => {
                this.ships = res.data.ships
                for(var s in this.ships) {
                    this.ships[s].performance = JSON.parse(this.ships[s].performance)
                    this.ships[s].equipment = JSON.parse(this.ships[s].equipment)
                }
                this.focus = res.data.focus
                this.types = res.data.types
                this.makes = res.data.makes
                this.sizes = res.data.sizes
            }).catch((err) => {
                console.error(err)
            })
        },
        editItem(type, action) {
            var size = this.edit[type]
            var current = this.ship_data.equipment[type][size]
            if (action == "add") {
                this.ship_data.equipment[type][size] = current + 1
            } else if (action == "remove") {
                if (current <= 0) {
                    return
                } else {
                    this.ship_data.equipment[type][size] = current - 1
                }
            } else {
                console.error('Invalid Action!')
            }
        }
    },
    computed: {
        shipName() {
            if (this.ship_data.make_abbr) {
                return (this.ship_data.make_abbr + "_" + this.ship_data.model.split(" ").join("_")).toUpperCase()
            } else if(this.makes && this.ship_data.make && this.ship_data.model) {
                return (this.makes[this.ship_data.make - 1].abbr + "_" + this.ship_data.model.split(" ").join("_")).toUpperCase()
            } else {
                return "<select options below>"
            }
        }
    },
    mounted() {
        if (this.editing) {
            this.ship_data = this.ship
        }
        this.getShips()
    }
}
</script>

<style>
.panels {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    max-width: 900px;
}
.modal-input {
    width: calc(100% - 5px)
}
.modal-select {
    width: calc(100% - 5px);
    margin: 0px 5px 5px;
}

.modal-button {
    margin-right: 5px;
}

.modal-panel {
    flex-basis: 250px;
    flex-grow: 1;
    margin: 20px 10px;
}

.array-input {
    display: flex;
    flex-wrap: 1;
}

.array-item {
    display: flex;
    flex-wrap: 0;
    width: 55px;
}

.array-item>input {
    width: 15px;
    margin: 0 5px;
}
</style>