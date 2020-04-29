<template>
    <div class="fleet">
        <portal to="leftDock">
            <org-panel v-if="fleet" :org_tag="fleet.org_tag" />
        </portal>
        <main-panel v-if="fleet" title="Fleet Hierarchy" class="fleet-chart">
            <organization-chart v-if="chart" :datasource="chart" @node-click="clicked" :selected="selected" @removeGroup="removeGroup"></organization-chart>
        </main-panel>
        <fleet-group :groupID="selected" :isOwner="isOwner" @addGroup="addGroup" @removeGroup="removeGroup" :shipPool="shipPool" />
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import OrganizationChart from '@/components/layout/orgchart/OrgChartContainer'

import OrgBanner from '@/components/org/OrgBanner'
import OrgPanel from '@/components/org/OrgPanel'
import FleetGroup from '@/components/fleet/FleetGroup'
import FleetTools from '@/components/fleet/FleetTools'

export default {
    layout: ({ isMobile }) => isMobile ? 'mobile' : 'default',
    name: 'Fleet',
    components: {
        OrganizationChart,
        OrgBanner,
        OrgPanel,
        FleetGroup,
        FleetTools
    },
    data () {
        return {
            fleet: null,
            org: null,
            shipPool: null,
            chart: null,
            selected: 0,
        }
    },
    computed: {
        ...mapGetters('fleet',[
            'pageData'
        ]),
        spectrumLink() {
            if (this.fleet) {
                return `https://robertsspaceindustries.com/spectrum/community/${this.fleet.org_tag}`
            }
        },
        isOwner() {
            return true
        }
    },
    methods: {
        ...mapActions('fleet',[
            'setPageData'
        ]),
        clicked(data) {
            console.log(data)
            this.selected = parseInt(data.id)
        },
        loadFleet() {
            this.$axios({
                url: `https://api.uee.life/fleet/${this.$route.params.id}`,
                method: 'GET'
            }).then(async (res) => {
                this.selected = parseInt(this.$route.params.id)
                this.fleet = res.data
                this.loadOrg(this.fleet.org_tag)
                this.fleet.children = await this.getSubgroups(this.$route.params.id)
                this.chart = this.fleet
            }).catch((err) => {
                console.error(err)
            })
        },
        loadShipPool() {
            this.$axios({
                url: `https://api.uee.life/orgs/${this.org.tag}/ships/${this.$route.params.id}`,
                method: 'GET'
            }).then((res) => {
                this.shipPool = res.data
            }).catch((err) => {
                console.error(err)
            })
        },
        async getSubgroups(groupID) {
            return await this.$axios({
                url: `https://api.uee.life/fleet/${groupID}/groups`,
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
            params.data.org = this.fleet.org

            this.$axios({
                url: `https://api.uee.life/fleet/${params.groupID}/groups`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: params.data
            }).then((res) => {
                if (res.data.success) {
                    this.loadFleet()
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
                url: `https://api.uee.life/fleet/${groupID}`,
                method: 'DELETE'
            }).then((res) => {
                if (!iter && res.data.success) {
                    this.$swal.fire(
                        'Deleted!',
                        'Group has been deleted!',
                        'success'
                    )
                    this.loadFleet()
                }
            }).catch((err) => {
                console.error(err)
            })
        },
        async addShip(params) {
            // add the ship

            // reload ship pool
            this.loadShipPool()
        },
        loadOrg(tag) {
            this.$axios({
                url: `https://api.uee.life/orgs/${tag}`,
                method: 'GET'
            }).then((res) => {
                this.org = res.data
                this.loadShipPool()
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
        this.setPageData({})
        this.loadFleet()
        this.selected = parseInt(this.$route.params.id)
    }
}
</script>

<style>


</style>