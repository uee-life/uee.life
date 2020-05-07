<template>
    <div class="org-fleet-view">
        <section-title text="Org Fleets" size="medium"/>
        <template  v-if="fleets.length > 0">
            <fleet-panel v-for="f in fleets" :key="f.id" :fleetID="f.id" />
        </template>
        <template v-else>
            No fleets configured
        </template>
        <main-panel v-if="isOwner" class="add-fleet" @click="modals.fleet = true">
            ADD FLEET
        </main-panel>
        <modal v-if="modals.fleet" title="Add Fleet" @close="modals.fleet = false">
            <fleet-form @add="addFleet" />
        </modal>
    </div>
</template>

<script>
import FleetForm from '@/components/fleet/FleetForm'
import FleetPanel from '@/components/fleet/FleetPanel'

export default {
    name: 'OrgFleetView',
    props: {
        org: {
            type: Object,
            default: function () {
                return {}
            }
        },
        isOwner: {
            type: Boolean,
            default: false
        }
    },
    components: {
        FleetForm,
        FleetPanel
    },
    data () {
        return {
            modals: {
                fleet: false
            },
            fleets: []
        }
    },
    methods: {
        fetchFleets() {
            this.$axios({
                url: `https://api.uee.life/orgs/${this.org.tag}/fleets`,
                method: 'GET'
            }).then((res) => {
                this.fleets = res.data
            }).catch((err) => {
                console.error(err)
            })
        },
        addFleet(fleet) {
            this.modals.fleet = false
            fleet.parent = 0
            console.log(fleet)
            this.$axios({
                url: `https://api.uee.life/orgs/${this.org.id}/fleets`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: fleet
            }).then((res) => {
                if (res.data.success) {
                    this.fetchFleets()
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
        org: {
            handler: async function () {
                if(this.org.tag) {
                    this.fetchFleets()
                }
            }
        }
    },
    mounted() {
        if(this.org.tag) {
            this.fetchFleets()
        }
    }
}
</script>

<style>
.org-fleet-view {
    position: relative;
    margin: 25px -10px 30px;
    padding-top: 10px;
}

.add-fleet {
    margin: 10px;
}
</style>