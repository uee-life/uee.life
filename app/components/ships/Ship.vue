<template>
    <div>
        <portal to="leftDock">
            <dock-item v-if="ship" title="owner" class="owner">
                <portrait :handle="ship.owner" :showName="true"/>
            </dock-item>
        </portal>
        <ship-banner v-if="ship" :ship="ship" />
        <main-panel v-if="ship" title="info">
            <div class="info-item">
                <span class="label">Ship ID:</span>
                <span class="value">{{ shipID }}</span>
            </div>
            <div class="info-item">
                <span class="label">Name:</span>
                <span class="value">{{ ship.name }}</span>
            </div>
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
            <div class="info-item">
                <span class="label">Max Crew:</span>
                <span class="value">{{ ship.max_crew }}</span>
            </div>
            <div class="info-item">
                <span class="label">Max Cargo:</span>
                <span class="value">{{ ship.cargo }}</span>
            </div>
        </main-panel>
        <main-panel title="crew" class="crew">
            <div v-for="(c, i) in crew" :key="i" class="crewman">
                <div v-if="c" class="assigned">
                    <h3 class="role">{{ c.role }}</h3>
                    <portrait :handle="c.citizen" size="small" :showName="true" />
                    <img v-if="isOwner || isSelf(c.citizen)" @click="removeCrew(c.id)" class="delete" src="~/assets/delete.png">
                </div>
                <div v-else class="unassigned">
                    <h3 class="role">&nbsp;</h3>
                    <div class="bg"/>
                    <img v-if="isOwner" @click="showModal = true" src="~/assets/plus.png" class="add-new"/>
                    <div v-else class="add-new" />
                    <div class="name">Unassigned</div>
                </div>
            </div>
        </main-panel>
        <modal v-if="showModal" title="Add Crew" @close="showModal = false">
            <crew-form @add="addCrew" />
        </modal>
    </div>
</template>

<script>
import ShipBanner from '@/components/ships/ShipBanner'
import CrewForm from '@/components/ships/CrewForm'

export default {
    props: {
        id: {
            type: Number,
            required: true
        }
    },
    data () {
        return {
            ship: null,
            crew: null,
            showModal: false
        }
    },
    components: {
        ShipBanner,
        CrewForm
    },
    computed: {
        user() {
            return this.$auth.user
        },
        shipID() {
            return `UES-${('00' + this.ship.id.toString(16).toUpperCase()).substr(-6)}`
        },
        isOwner() {
            if(this.ship && this.$auth.loggedIn && this.user.app_metadata.handle_verified && this.user.app_metadata.handle.toLowerCase().trim() === this.ship.owner.toLowerCase().trim()) {
                return true
            }
            return false
        }
    },
    methods: {
        isSelf(crewname) {
            if (this.ship && this.$auth.loggedIn && this.user.app_metadata.handle_verified && this.user.app_metadata.handle.toLowerCase().trim() === crewname.toLowerCase().trim()) {
                return true
            }
            return false
        },
        loadShip() {
            this.$axios({
                url: `https://api.uee.life/ships/${this.id}`,
                method: 'GET'
            }).then((res) => {
                this.ship = res.data
                this.loadCrew()
            }).catch((err) => {
                console.error(err)
            })
        },
        loadCrew() {
            this.$axios({
                url: `https://api.uee.life/ships/${this.id}/crew`,
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
        async addCrew(crew) {
            console.log("Adding crewmen: ", crew)
            this.showModal = false
            await this.$axios({
                url: `https://api.uee.life/ships/${this.id}/crew`,
                method: 'POST',
                headers: {
                    'Content-type': 'application/json; charset=utf-8'
                },
                data: crew
            }).then((res) => {
                console.log('foobar')
                this.loadCrew()
                this.$swal.fire('success', "Crewmen Added!", 'success')
            }).catch((err) => {
                console.error(err)
            })
        },
        removeCrew(crew_id) {
            console.log("Removing crewmen: ", crew_id)
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

.owner {
    display: flex;
    justify-content: center;
}

.crew {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.crewman {
    margin: 10px;
}

.assigned {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.assigned .delete {
    position: absolute;
    top: 15px;
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