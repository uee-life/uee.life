<template>
    <div id="fleet-view" class="fleet-view">
        <div>Fleet:</div>
        <div class="ships">
            <ship-summary v-for="(s, index) in ships" :key="s.id" :ship="s" :index="index">
            </ship-summary>
        </div>
    </div>
</template>

<script>
import { TimelineLite } from 'gsap'
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
    },
    mounted() {
        const tl = new TimelineLite()
        tl.to(".ships", 2, {opacity: 1})
    }
}
</script>

<style>
    .ships {
        display: flex;
        flex-wrap: wrap;
        opacity: 0;
    }
</style>