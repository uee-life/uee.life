<template>
    <div v-if="group" class="fleet-group">
        <div class="info">    
            <div class="info-panel">
                <main-panel :title="group.name" class="tools">
                    <input class="tool-button" @click="removeGroup" type="button" value="Delete Group"></input>
                    <input class="tool-button" @click="modals.group = true" type="button" value="Add Subgroup"></input>
                    <input class="tool-button" @click="modals.ship = true" type="button" value="Add Ship"></input>
                </main-panel>
                <fleet-view class="fleet-list" v-if="ships" :ships="ships" :isOwner="true" @add="addShip"/>
            </div>
            <div class="info-panel no-grow">
                <main-panel class="commander">
                    <div v-if="group.cmdr" class="assigned">
                        <h5>{{ group.type }} Commander</h5>
                        <portrait :handle="group.cmdr" :showName="true">
                            <div class="mask"  @click="showCrewmember(c)"></div>
                            <img v-if="isOwner" @click="showCrewmember(c)" class="edit" src="~/assets/edit.png">
                            <img v-else-if="isSelf(group.cmdr)" @click="removeCrew(c.id)" class="edit" src="~/assets/delete.png">
                        </portrait>
                    </div>
                    <div v-else class="unassigned">
                        <h5>Commander</h5>
                        <div class="bg">
                        <img v-if="isOwner" @click="modals.commander = true" src="~/assets/plus.png" class="add-new"/>
                        <div v-else class="add-new" />
                        </div>
                        <div class="name">Unassigned</div>
                    </div>
                </main-panel>
            </div>
        </div>
        <modal v-if="modals.group" title="Crew Record" @close="modals.group = false">
            <fleet-form @add="addGroup" :shipPool="shipPool"/>
        </modal>
        <modal v-if="modals.crew" title="Add Crew" @close="modals.crew = false">
            <crew-form @add="addCrew" />
        </modal>
        <modal v-if="modals.commander" title="Select Commander" @close="modals.commander = false">
            <crew-form @add="addCommander" :roleSelect="false" />
        </modal>
    </div>
</template>

<script>
import FleetView from '@/components/fleet/FleetView'
import FleetForm from '@/components/fleet/FleetForm'
import CrewForm from '@/components/ships/CrewForm'

export default {
    name: 'FleetGroup',
    props: ["groupID", "shipPool", "isOwner"],
    components: {
        FleetView,
        FleetForm,
        CrewForm
    },
    data () {
        return {
            group: null,
            ships: null,
            selected: null,
            modals: {
                group: false,
                crew: false,
                commander: false
            },
            edit: {
                group: false,
                crew: false
            }
        }
    },
    methods: {
        loadGroup() {
            this.$axios({
                url: `https://api.uee.life/fleet/${this.groupID}`,
                method: 'GET'
            }).then((res) => {
                this.group = res.data
                this.loadShips()
            }).catch((err) => {
                console.log(err)
                this.group = null
            })
        },
        loadShips() {
            this.$axios({
                url: `https://api.uee.life/fleet/${this.groupID}/ships`,
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
        addCommander(data) {
            this.modals.commander = false
            console.log(data)
            this.$axios({
                url: `https://api.uee.life/fleet/${this.groupID}`,
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    cmdr: data.handle
                }
            }).then((res) => {
                console.log(res)
                if(res.data.success) {
                    this.$swal.fire('success', res.data.msg, 'success')
                    this.loadGroup()
                } else {
                    this.$swal.fire('error', res.data.msg, 'error')
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        addShip(data) {
            console.log('Add Ship', data)
        },
        addCrew(data) {
            console.log(data)
        }
    },
    watch: {
        groupID: {
            handler: function() {
                this.loadGroup()
            }
        }
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

.fleet .info .info-panel {
    display: flex;
    flex-direction: column;
    flex-basis: 250px;
    margin-left: 10px;
    margin-right: 10px;
    flex-grow: 1;
}

.fleet .info .info-panel .group-title {
    position: relative;

}

.fleet .info .commander {
    height: fit-content;
}

.fleet .info .tools {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}

.fleet .info .tools .tool-button {
    margin: 5px;
    padding: 0 15px;
    height: 40px;
    line-height: 40px;
    flex-basis: 120px;
}

.fleet-list {
    width: 100%;
}

.info-panel.no-grow {
  flex-grow: 0 !important;
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
    cursor: pointer;
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