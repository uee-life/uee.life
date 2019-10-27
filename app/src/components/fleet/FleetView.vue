<template>
    <div id="fleet-view" class="fleet-view">
        <div>Fleet:</div>
        <div class="ships">
        <ship-summary v-for="s in ships" :key="s.id" :ship="s">
        </ship-summary>
        </div>
    </div>
</template>

<script>
import ShipSummary from '@/components/fleet/ShipSummary.vue'

export default {
    name: "fleet-view",
    components: {
        ShipSummary
    },
    props: ["ships"],
    data() {
        return {
        }
    }
}
</script>

<style>
    .ships {
        display: flex;
        flex-wrap: wrap;
    }
</style>