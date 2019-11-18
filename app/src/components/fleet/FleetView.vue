<template>
    <div id="fleet-view" class="fleet-view">
        <div class="section-title hidden">
            <span class="text">
                FLEET
                <div class="endcap left"></div>
                <div class="endcap right"></div>
            </span>
        </div>
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
        tl.to(".fleet-view .section-title", 1, {opacity: 1})
        tl.to(".ships", 2, {opacity: 1})
    }
}
</script>

<style>
    .fleet-view {
        position: relative;
        padding-top: 20px;
    }
    .ships {
        display: flex;
        flex-wrap: wrap;
        opacity: 0;
    }
</style>