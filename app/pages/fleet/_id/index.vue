<template>
    <div class="fleet">
        <portal to="rightDock">
            <org-panel v-if="fleet && fleet.type == 1" :org_tag="fleet.org_tag" />
            <citizen-panel v-if="fleet && fleet.type == 2" :handle="fleet.handle" />
            <!-- add panels for other fleet types (personal, event) -->
        </portal>
        <template v-if="loading">
            <div class="loading">
                <img src="~/assets/loading.gif" >
            </div>
        </template>
        <template v-else>
        <main-panel v-if="fleet" title="Fleet Hierarchy" class="fleet-chart">
            <organization-chart v-if="chart" :datasource="chart" @node-click="clicked" :selected="selected" @removeGroup="removeGroup"></organization-chart>
        </main-panel>
        <fleet-group 
            :groupID="selected" 
            @addGroup="addGroup" 
            @removeGroup="removeGroup" 
            @addShip="addShip"
            @showShip="showShip"
            @removeShip="removeShip"
            @updateCommander="updateCommander"
            :shipPool="shipPool" />
        </template>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import OrganizationChart from '@/components/layout/orgchart/OrgChartContainer'

import OrgPanel from '@/components/org/OrgPanel'
import CitizenPanel from '@/components/citizen/CitizenPanel'
import FleetGroup from '@/components/fleet/FleetGroup'
import FleetTools from '@/components/fleet/FleetTools'

export default {
    layout: ({ isMobile }) => isMobile ? 'mobile' : 'default',
    name: 'Fleet',
    components: {
        OrganizationChart,
        OrgPanel,
        CitizenPanel,
        FleetGroup,
        FleetTools
    },
    data () {
        return {
            loading: true,
            fleet: null,
            shipPool: null,
            chart: null,
            selected: 0,
        }
    },
    computed: {
        ...mapGetters('fleet',[
            'isAdmin'
        ]),
        ...mapGetters({
            citizen: 'loggedCitizen'
        }),
        spectrumLink() {
            if (this.fleet) {
                return `https://robertsspaceindustries.com/spectrum/community/${this.fleet.org_tag}`
            }
        }
    },
    methods: {
        ...mapActions('fleet',[
            'setAdmin'
        ]),
        checkAdmin() {
            console.log('checking admin status')
            // Org Fleet
            if (this.fleet && this.fleet.type == 1) {
                console.log('fleet admin?')
                // if is a director
                if (this.citizen && this.citizen.info.org === this.fleet.org_tag && this.citizen.info.orgRank >= 5) {
                    console.log('Director found!')
                    this.setAdmin(true)
                    return true
                }
                return false
            } else if (this.fleet && this.fleet.type == 2) {
                // personal fleet
                if (this.$auth.user && this.fleet.handle === this.$auth.user.app_metadata.handle) {
                    this.setAdmin(true)
                    return true
                }
            }
        },
        clicked(data) {
            console.log(data)
            this.selected = parseInt(data.id)
        },
        loadFleet(selected) {
            this.loading = true
            this.$axios({
                url: `https://api.uee.life/fleets/${this.$route.params.id}`,
                method: 'GET'
            }).then(async (res) => {
                if (res.data.id && res.data.parent === 0) {
                    this.selected = selected
                    this.fleet = res.data
                    this.fleet.children = await this.getSubgroups(this.$route.params.id)
                    this.chart = this.fleet
                    await this.loadShipPool()
                    this.checkAdmin()
                    this.loading = false
                } else {
                    this.$router.push('/')
                }
            }).catch((err) => {
                console.error(err)
            })
        },
        loadShipPool() {
            console.log('loading ship pool...')
            let url = ''
            if (this.fleet.type == 1) {
                url = `https://api.uee.life/orgs/${this.fleet.org_tag}/ships/${this.fleet.id}`
            } else if (this.fleet.type == 2) {
                url = `https://api.uee.life/citizens/${this.fleet.handle}/ships`
            }
            this.$axios({
                url: url,
                method: 'GET'
            }).then((res) => {
                this.shipPool = res.data
            }).catch((err) => {
                console.error(err)
            })
        },
        async getSubgroups(groupID) {
            return await this.$axios({
                url: `https://api.uee.life/fleets/${groupID}/groups`,
                method: 'GET'
            }).then(async (res) => {
                const groups = []
                for (let i in res.data) {
                    const group = res.data[i]
                    group.children = await this.getSubgroups(group.id)
                    groups.push(group)
                }
                return groups
            }).catch((err) => {
                console.error(err)
                return []
            })
        },
        async addGroup(params) {
            params.data.owner = this.fleet.owner

            this.$axios({
                url: `https://api.uee.life/fleets/${params.groupID}/groups`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: params.data
            }).then((res) => {
                if (res.data.success) {
                    this.loadFleet(this.selected)
                    this.$swal.fire('success', 'Group added!', 'success')
                } else {
                    this.$swal.fire('error', 'Could not add group :(', 'error')
                }
            }).catch((err) => {
                console.error(err)
            })
        },
        async removeGroup(groupID, iter=false) {
            // remove all children, then remove this.
            const subgroups = await this.getSubgroups(groupID)
            for (let i in subgroups) {
                await this.removeGroup(subgroups[i].id, true)
            }
            console.log("Removing: ", groupID)
            this.$axios({
                url: `https://api.uee.life/fleets/${groupID}`,
                method: 'DELETE'
            }).then((res) => {
                if (!iter && res.data.success) {
                    this.$swal.fire(
                        'Deleted!',
                        'Group has been deleted!',
                        'success'
                    )
                    if (groupID == this.$route.params.id) {
                        this.$router.push(`/orgs/${this.org.tag}`)
                    } else {
                        this.loadFleet(parseInt(this.$route.params.id))
                    }
                }
            }).catch((err) => {
                console.error(err)
            })
        },
        async addShip(params) {
            console.log('adding ship', params)
            // add the ship
            const data = {
                group: params.group,
                ship: params.ship
            }
            this.$axios({
                url: `https://api.uee.life/fleets/${this.fleet.id}/ships`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            }).then((res) => {
                if (res.data.success) {
                    this.loadFleet(this.selected)
                    this.$swal.fire('success', 'Ship added!', 'success')
                } else {
                    this.$swal.fire('error', 'Could not add ship :(', 'error')
                }
            }).catch((err) => {
                console.error(err)
            })

            // reload ship pool
            this.loadShipPool()
        },
        showShip(data) {
            console.log('showShip', this.shipID(data))
            this.$router.push(`/fleet/${this.fleet.id}/ship/${this.shipID(data)}`)
        },
        async removeShip(params) {
            console.log('removing ship', params.ship)
            this.$axios({
                url: `https://api.uee.life/fleets/${params.group}/ships/${params.ship}`,
                method: 'DELETE'
            }).then((res) => {
                if (res.data.success) {
                    this.loadFleet(this.selected)
                    this.loadShipPool()
                    this.$swal.fire('success', 'Ship removed!', 'success')
                } else {
                    this.$swal.fire('error', 'Could not remove ship :(', 'error')
                }
            }).catch((err) => {
                console.error(err)
            })
        },
        async updateCommander(data) {
            this.$axios({
                url: `https://api.uee.life/fleets/${data.group}`,
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    cmdr: data.handle
                }
            }).then((res) => {
                if(res.data.success) {
                    this.$swal.fire('success', res.data.msg, 'success')
                } else {
                    this.$swal.fire('error', res.data.msg, 'error')
                }
                this.loadFleet(this.selected)
            }).catch((err) => {
                console.log(err)
            })
        },
        isSelf(crewname) {
            if (this.ship && this.$auth.loggedIn && this.user.app_metadata.handle_verified && this.user.app_metadata.handle.toLowerCase().trim() === crewname.toLowerCase().trim()) {
                return true
            }
            return false
        },
    },
    mounted() {
        //this.setPageState({})
        this.loadFleet(parseInt(this.$route.params.id))
        this.selected = parseInt(this.$route.params.id)
    },
    watch: {
        fleet: {
            handler: function () {
                if (this.fleet) {
                    this.checkAdmin()
                }
            }
        }
    }
}
</script>

<style>


</style>