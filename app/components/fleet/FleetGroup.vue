<template>
    <div v-if="group" class="fleet-group">
        <div class="info">
            <div v-if="isMobile && canEdit" class="info-panel">
                <main-panel :title="group.name" class="tools">
                    <input v-if="isAdmin || (canEdit && (!group.cmdr || citizen.info.handle.toLowerCase() !== group.cmdr.toLowerCase()))" class="tool-button" @click="removeGroup" type="button" value="Delete Group">
                    <input v-if="isAdmin || (canEdit && (!group.cmdr || citizen.info.handle.toLowerCase() !== group.cmdr.toLowerCase()))" class="tool-button" @click="modals.edit = true" type="button" value="Edit Group">
                    <input class="tool-button" @click="modals.group = true" type="button" value="Add Subgroup">
                    <input class="tool-button" @click="modals.ship = true" type="button" value="Add Ship">
                </main-panel>
            </div>
            <div :class="panelClass">
                <main-panel class="commander">
                    <div v-if="group.cmdr" class="assigned">
                        <h5>Group Commander</h5>
                        <portrait :handle="group.cmdr" :showName="true">
                            <div class="mask"></div>
                            <img v-if="canEdit" @click="removeCommander()" class="edit" src="~/assets/delete.png">
                        </portrait>
                    </div>
                    <div v-else class="unassigned">
                        <h5>Commander</h5>
                        <div class="bg">
                        <img v-if="canEdit" @click="modals.commander = true" src="~/assets/plus.png" class="add-new"/>
                        <div v-else class="add-new" />
                        </div>
                        <div class="name">Unassigned</div>
                    </div>
                </main-panel>
                <slot name="assignment"></slot>
            </div> 
            <div class="info-panel">
                <main-panel v-if="!isMobile && canEdit" :title="group.name" class="tools">
                    <input v-if="isAdmin || (canEdit && (!group.cmdr || citizen.info.handle.toLowerCase() !== group.cmdr.toLowerCase()))" class="tool-button" @click="removeGroup" type="button" value="Delete Group">
                    <input v-if="isAdmin || (canEdit && (!group.cmdr || citizen.info.handle.toLowerCase() !== group.cmdr.toLowerCase()))" class="tool-button" @click="modals.edit = true" type="button" value="Edit Group">
                    <input class="tool-button" @click="modals.group = true" type="button" value="Add Subgroup">
                    <input class="tool-button" @click="modals.ship = true" type="button" value="Add Ship">
                </main-panel>
                <ship-list class="fleet-list" v-if="ships" :ships="ships" :isAdmin="canEdit" @selected="showShip" @remove="removeShip"/>
            </div>
        </div>
        <modal v-if="modals.group" title="Add Subgroup" @close="modals.group = false">
            <fleet-form @add="addGroup"/>
        </modal>
        <modal v-if="modals.ship" title="Add Ship" @close="modals.ship = false">
            <ship-list class="ship-modal" :ships="shipPool" view="small" :showControls="false" @selected="addShip"></ship-list>
        </modal>
        <modal v-if="modals.commander" title="Select Commander" @close="modals.commander = false">
            <crew-form @add="updateCommander" :roleSelect="false" />
        </modal>
        <modal v-if="modals.edit" title="Edit Group" @close="modals.edit = false">
            <fleet-form :group="group" @update="updateGroup"/>
        </modal>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

import ShipList from '@/components/fleet/ShipList'
import FleetForm from '@/components/fleet/FleetForm'
import CrewForm from '@/components/ships/CrewForm'

export default {
    name: 'FleetGroup',
    props: {
        groupID: {
            type: Number,
            required: true
        },
        shipPool: {
            type: Array,
            default: function () {
                return []
            }
        }
    },
    components: {
        ShipList,
        FleetForm,
        CrewForm
    },
    data () {
        return {
            group: null,
            commanders: [],
            ships: [],
            selected: null,
            modals: {
                group: false,
                commander: false,
                ship: false,
                edit: false
            },
            edit: {
                group: false,
                crew: false
            }
        }
    },
    computed: {
        ...mapGetters('fleet',[
            'isAdmin'
        ]),
        ...mapGetters({
            citizen: 'loggedCitizen'
        }),
        isCommander() {
            if (this.citizen && this.commanders.includes(this.citizen.info.handle)) {
                return true
            }
            return false
        },
        canEdit() {
            if (this.isAdmin || this.isCommander) {
                return true
            }
            return false
        },
        panelClass() {
            if (this.isMobile) {
                return "info-panel"
            } else {
                return "info-panel no-grow"
            }
        }
    },
    methods: {
        loadGroup() {
            this.$axios({
                url: `https://api.uee.life/fleets/${this.groupID}`,
                method: 'GET'
            }).then((res) => {
                this.group = res.data
                this.loadCommanders()
                this.loadShips()
            }).catch((err) => {
                console.log(err)
                this.group = null
            })
        },
        loadCommanders() {
            this.$axios({
                url: `/fleets/${this.groupID}/commanders`,
                method: 'GET'
            }).then((res) => {
                this.commanders = res.data
            }).catch((err) => {
                console.error(err)
            })
        },
        loadShips() {
            this.$axios({
                url: `https://api.uee.life/fleets/${this.groupID}/ships`,
                method: 'GET'
            }).then((res) => {
                this.ships = res.data
            }).catch((err) => {
                console.error(err)
            })
        },
        addGroup(data) {
            this.modals.group = false
            this.$emit('addGroup', {groupID: this.groupID, data: data})
        },
        updateGroup(data) {
            this.modals.edit = false
            const newdata = {
                cmdr: this.group.cmdr,
                name: data.name,
                purpose: data.purpose,
                group: this.groupID
            }
            this.$emit('updateGroup', newdata)
        },
        removeGroup() {
            this.$swal.fire({
                title: 'Are you sure?',
                text: 'This will remove this group and all child groups!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!'
            }).then((res) => {
                if(res.value) {
                    this.$emit('removeGroup', this.groupID)
                }
            })
        },
        removeCommander() {
            if (this.$auth.loggedIn && this.$auth.user.app_metadata.handle.toLowerCase() === this.group.cmdr.toLowerCase()) {
                this.$swal.fire({
                    title: 'Are you sure?',
                    text: 'Do you really wish to resign your commission? You will not be able to undo this...',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'I Resign!'
                }).then((res) => {
                    if(res.value) {
                        this.updateCommander({handle: ''})
                    }
                })
            } else {
                this.updateCommander({handle: ''})
            }
        },
        updateCommander(data) {
            const newdata = {
                cmdr: data.handle,
                name: this.group.name,
                purpose: this.group.purpose,
                group: this.groupID
            }
            this.modals.commander = false
            this.$emit('updateGroup', newdata)
        },
        addShip(id) {
            this.modals.ship = false
            const data = {
                ship: id,
                group: this.groupID
            }
            console.log('Add Ship', id, 'to group', this.groupID)
            this.$emit('addShip', data)
        },
        removeShip(id) {
            const data = {
                ship: id,
                group: this.groupID
            }
            this.$emit('removeShip', data)
        },
        showShip(data) {
            console.log('Show Ship', data)
            this.$emit('showShip', data)
        },
        addCrew(data) {
            console.log(data)
        }
    },
    watch: {
        groupID: {
            handler: function() {
                this.commanders = []
                this.loadGroup()
            }
        },
        shipPool: {
            handler: function () {
                this.loadGroup()
            }
        }
    },
    mounted() {
        this.commanders = []
        this.loadGroup()
    }
}
</script>

<style scoped>
.fleet .info {
    display: flex;
    flex-wrap: wrap;
    width: calc(100% + 20px);
    margin-left: -10px;
    margin-right: -10px;
    opacity: 1;
}

.ship-modal {
    padding: 15px;
    max-height: 75vh;
    overflow-y: scroll;
}

.fleet .info .info-panel {
    display: flex;
    flex-direction: column;
    flex-basis: 250px;
    margin: 10px;
    flex-grow: 1;
}

.fleet .info .info-panel .group-title {
    position: relative;

}

.fleet .info .commander {
    height: fit-content;
    max-height: fit-content;
    margin: 20px 10px;
}

.fleet .info .tools {
    display: flex;
    justify-content: center;
    flex-grow: 0;
    flex-wrap: wrap;
}

.fleet .info .tools .tool-button {
    margin: 5px;
    padding: 0 5px;
    height: 30px;
    line-height: 30px;
    flex-basis: 120px;
}

.fleet-list {
    width: 100%;
}

.info-panel.no-grow {
  flex-grow: 0 !important;
  margin: 10px auto !important;
}

    .info-panel.group-info {
        display: flex;
        flex-direction: column;
    }


.portrait .mask {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
}

.assigned {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
}

.assigned h3 {
    margin-bottom: 10px;
}

.assigned .edit {
    position: absolute;
    top: -6px;
    right: -6px;
    width: 20px;
    height: 20px;
    cursor: pointer;
}

.unassigned {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
}

.unassigned .add-new {
    display: block;
    position: relative;
    box-sizing: border-box;
    width: 165px;
    height: 165px;
    padding: 20px;
    border: 1px dashed #546f84;
    cursor: pointer;
}

.unassigned .bg {
    position: relative;
    content: "";
    background: url('https://robertsspaceindustries.com/rsi/static/images/account/avatar_default_big.jpg');
    background-size: 165px 165px;
    background-repeat: no-repeat;
    opacity: 0.4;
    width: 165px;
    height: 165px;
}

.unassigned .name {
    font-size: 16px;
}
</style>