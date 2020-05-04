<template>
    <main-panel title="Crew" class="crew">
        <div v-for="(c, i) in crew" :key="i" class="crewman">
            <div v-if="c" class="assigned">
                <h5 class="role">{{ c.role }}</h5>
                <portrait :handle="c.citizen" size="small" :showName="true">
                    <div class="mask"  @click="showCrewmember(c)"></div>
                    <img v-if="isOwner" @click="showCrewmember(c)" class="edit" src="~/assets/edit.png">
                    <img v-else-if="isSelf(c.citizen)" @click="removeCrew(c.id)" class="edit" src="~/assets/delete.png">
                </portrait>
            </div>
            <div v-else class="unassigned">
                <h5 class="role">&nbsp;</h5>
                <div class="bg"/>
                <img v-if="isOwner" @click="showModal = true" src="~/assets/plus.png" class="add-new"/>
                <div v-else class="add-new" />
                <div class="name">Unassigned</div>
            </div>
        </div>
        <modal v-if="showCrew" title="Crew Record" @close="showCrew = false">
            <crew :crew="selected" @remove="removeCrew" @update="updateCrew" :canEdit="isOwner"/>
        </modal>
        <modal v-if="showModal" title="Add Crew" @close="showModal = false">
            <crew-form @add="addCrew"/>
        </modal>
    </main-panel>
</template>

<script>
import Crew from '@/components/ships/Crew'
import CrewForm from '@/components/ships/CrewForm'

export default {
    name: 'CrewList',
    props: {
        ship: {
            type: Object,
            default: function () {
                return {}
            }
        },
        fleet: {
            type: Number,
            default: 0
        }
    },
    data () {
        return {
            showModal: false,
            showCrew: false,
            crew: null,
            selected: null
        }
    },
    components: {
        Crew,
        CrewForm
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
        }
    },
    methods: {
        showCrewmember(c) {
            this.selected = c
            this.showCrew = true
        },
        isSelf(crewname) {
            if (this.ship && this.$auth.loggedIn && this.user.app_metadata.handle_verified && this.user.app_metadata.handle.toLowerCase().trim() === crewname.toLowerCase().trim()) {
                return true
            }
            return false
        },
        loadCrew() {
            let url = ''
            if (this.fleet) {
                url = `/fleets/${this.fleet}/ships/${this.ship.id}/crew`
            } else {
                url = `/ships/${this.ship.id}/crew`
            }
            this.$axios({
                url: url,
                method: 'GET'
            }).then((res) => {
                this.crew = res.data
                if (this.crew.length < this.ship.max_crew) {
                    const pad = new Array(this.ship.max_crew - this.crew.length).fill(null)
                    console.log('expanding crew list!', this.crew, pad)
                    this.crew = this.crew.concat(pad)
                    console.log(this.crew)
                }
            }).catch((err) => {
                console.error(err)
            })
        },
        async addCrew(crewmen) {
            this.showModal = false
            // TODO: Check crewmember isn't already in the crew!
            for (var c in this.crew) {
                console.log(c, this.crew[c], crewmen)
                if(this.crew[c] && this.crew[c].citizen === crewmen.handle) {
                    console.log("crewmen already exists!")
                    this.$swal.fire('warning', 'Crewmen already part of crew!', 'warning')
                    return
                }
            }
            console.log("Adding crewmen: ", crewmen)
            let url = ''
            if(this.fleet) {
                url = `/fleets/${this.fleet}/ships/${this.ship.id}/crew`
            } else {
                url = `https://api.uee.life/ships/${this.ship.id}/crew`
            }
            await this.$axios({
                url: url,
                method: 'POST',
                headers: {
                    'Content-type': 'application/json; charset=utf-8'
                },
                data: crewmen
            }).then((res) => {
                if (res.data.success) {
                    this.loadCrew()
                    this.$swal.fire('success', res.data.msg, 'success')
                } else {
                    this.$swal.fire('error', res.data.msg, 'error')
                }
            }).catch((err) => {
                console.error(err)
            })
        },
        async removeCrew(crew_id) {
            this.showCrew = false
            console.log("Removing crewmen: ", crew_id)
            // add confirm modal here

            await this.$axios({
                url: `https://api.uee.life/crew/${crew_id}`,
                method: 'DELETE'
            }).then((res) => {
                if (res.data.success) {
                    this.loadCrew()
                    this.$swal.fire('success', res.data.msg, 'success')
                } else {
                    this.$swal.fire('error', res.data.msg, 'error')
                }
            }).catch((err) => {
                console.error(err)
            })
        },
        async updateCrew(crew_id, role) {
            this.showCrew = false
            console.log("Updating Crewmen: ", crew_id, role)

            await this.$axios({
                url: `https://api.uee.life/crew/${crew_id}`,
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                data: {
                    role: role
                }
            }).then((res) => {
                if (res.data.success) {
                    this.loadCrew()
                    this.$swal.fire('success', res.data.msg, 'success')
                } else {
                    this.$swal.fire('error', res.data.msg, 'error')
                }
            }).catch((err) => {
                console.error(err)
            })
        }
    },
    watch: {
        ship: {
            handler: function () {
                if (this.ship) {
                    this.loadCrew()
                }
            }
        }
    },
    mounted() {
        if(this.ship) {
            this.loadCrew()
        }
    }
}
</script>

<style>
.crew {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.crewman {
    margin: 0 10px;
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
}

.unassigned .add-new {
    display: block;
    position: relative;
    box-sizing: border-box;
    width: 100px;
    height: 100px;
    padding: 20px;
    border: 1px dashed #546f84;
    cursor: pointer;
}

.unassigned .bg {
    content: "";
    background: url('https://robertsspaceindustries.com/rsi/static/images/account/avatar_default_big.jpg');
    background-size: 100px 100px;
    background-repeat: no-repeat;
    background-position-y: 22px;
    opacity: 0.4;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: absolute;
}

.unassigned .name {
    font-size: 12px;
}
</style>