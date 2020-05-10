<template>
    <div>
        <portal to="leftDock">
            <fleet-panel v-if="fleet" title="fleet" class="fleet" :fleetID="fleet">

            </fleet-panel>
            <dock-item v-if="ship" title="owner" class="owner">
                <portrait :handle="ship.owner" :showName="true"/>
            </dock-item>
        </portal>
        <ship-banner v-if="ship" :ship="ship" />
        <div class="ship-info">
        <main-panel v-if="ship" title="Registration" class="info-panel">
            <div class="info-item">
                <span class="label">Ship ID:</span>
                <span class="value">{{ shipID(ship.id) }}</span>
            </div>
            <div class="info-item">
                <span class="label">Reg Date:</span>
                <span class="value">{{ ueeDate(ship.registered) }}</span>
            </div>
            <div class="info-item">
                <span class="label">Name:</span>
                <span v-if="edit.name" class="value">
                    <input type="text" v-model="name" maxlength="30" />
                    <img @click="updateName" class="save" title="submit" src="~/assets/tick.png">
                    <img @click="edit.name = false" class="cancel" title="cancel" src="~/assets/delete.png">
                </span>
                <span v-else class="value">
                    {{ ship.name }}<img v-if="isOwner" @click="edit.name = true" class="edit" src="~/assets/edit.png">
                </span>
            </div>
        </main-panel>
        <main-panel v-if="ship" title="Hull Info" class="info-panel">
            <div class="info-item">
                <span class="label">Manufacturer:</span>
                <span class="value">{{ ship.make }}</span>
            </div>
            <div class="info-item">
                <span class="label">Model:</span>
                <span class="value">{{ ship.model }}</span>
            </div>
            <div class="info-item">
                <span class="label">Size:</span>
                <span class="value">{{ ship.size }}</span>
            </div>
            <div class="info-item">
                <span class="label">Role:</span>
                <span class="value">{{ `${ship.type} - ${ship.focus}` }}</span>
            </div>
        </main-panel>
        <main-panel v-if="ship" title="Metrics" class="info-panel">
            <div class="info-item">
                <span class="label">Max Crew:</span>
                <span class="value">{{ ship.max_crew }}</span>
            </div>
            <div class="info-item">
                <span class="label">Max Cargo:</span>
                <span class="value">{{ ship.cargo }}</span>
            </div>
        </main-panel>
        </div>
        <crew-list v-if="ship" :ship="ship" :fleet="fleet" :edit="canEdit"/>
    </div>
</template>

<script>
import ShipBanner from '@/components/ships/ShipBanner'
import CrewList from '@/components/ships/CrewList'
import FleetPanel from '@/components/fleet/FleetPanel'

export default {
    props: {
        id: {
            type: Number,
            required: true
        },
        fleet: {
            type: Number,
            default: 0
        },
        cmdrs: {
            type: Array,
            default: function () {
                return []
            }
        }
    },
    data () {
        return {
            ship: null,
            name: '',
            edit: {
                name: false
            }
        }
    },
    components: {
        ShipBanner,
        CrewList,
        FleetPanel
    },
    computed: {
        user() {
            return this.$auth.user
        },
        isOwner() {
            if(this.ship && this.$auth.loggedIn && this.user.app_metadata.handle_verified && this.user.app_metadata.handle.toLowerCase().trim() === this.ship.owner.toLowerCase().trim()) {
                return true
            }
            return false
        },
        canEdit() {
            if(this.fleet) {
                if (this.user && this.cmdrs.length > 0 && this.cmdrs.includes(this.user.app_metadata.handle)) {
                    return true
                }
            } else if (this.isOwner) {
                return true
            }
            return false
        }
    },
    methods: {
        showCrewmember(c) {
            console.log(c)
        },
        loadShip() {
            this.$axios({
                url: `https://api.uee.life/ships/${this.id}`,
                method: 'GET'
            }).then((res) => {
                this.ship = res.data
                this.name = res.data.name
            }).catch((err) => {
                console.error(err)
            })
        },
        updateName() {
            console.log("updating ship name to: ", this.name)
            this.edit.name = false
            this.$axios({
                url: `https://api.uee.life/ships/${this.id}`,
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                data: {
                    name: this.name
                }
            }).then((res) => {
                if(res.data.success) {
                    this.$swal.fire('success', res.data.msg, 'success')
                    this.loadShip()
                } else {
                    this.$swal.fire('warning', res.data.msg, 'warning')
                }
            }).catch((err) => {
                console.error(err)
            })
        }
    },
    mounted() {
        this.loadShip()
    }
}
</script>

<style>
.ship-info {
    display: flex;
    flex-wrap: wrap;
    margin-left: -10px;
    margin-right: -10px;
}
.info-panel {
      flex-basis: 250px;
      margin-left: 10px;
      margin-right: 10px;
      padding-left: 15px;
      flex-grow: 1;
}

.info-item {
    display: flex;
    margin-left: 15px;
}

.info-item .label {
    width: 110px;
}

.info-item .value .edit {
    position: absolute;
    width: 20px;
    height: 20px;
    margin-left: 5px;
    cursor: pointer;
}

.info-item .value .save {
    position: absolute;
    width: 20px;
    height: 20px;
    margin-left: 5px;
    cursor: pointer;
}

.info-item .value .cancel {
    position: absolute;
    width: 20px;
    height: 20px;
    margin-left: 30px;
    cursor: pointer;
}

.owner {
    display: flex;
    justify-content: center;
}

    .org-info .info .info-panel {
      flex-basis: 250px;
      margin-left: 10px;
      margin-right: 10px;
      flex-grow: 1;
    }
</style>