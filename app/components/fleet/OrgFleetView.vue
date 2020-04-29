<template>
    <div class="org-fleet-view">
        <main-panel v-if="isOwner" class="add-fleet" @click="showModal = true">
            ADD FLEET
        </main-panel>
        <modal v-if="showModal" title="Add Fleet" @close="showModal = false">
            <fleet-form @add="addFleet" />
        </modal>
    </div>
</template>

<script>
import FleetForm from '@/components/fleet/FleetForm'

export default {
    name: 'FleetBuilder',
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
        FleetForm
    },
    data () {
        return {
            showModal: false
        }
    },
    methods: {
        addFleet(fleet) {
            fleet.org = this.org.id
            fleet.parent = 0
            console.log(fleet)
        }
    }
}
</script>

<style>

</style>