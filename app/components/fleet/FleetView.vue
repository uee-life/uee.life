<template>
    <div id="fleet-view" class="fleet-view">
        <div v-if="ships.length > 0" class="ships">
            <ship-summary v-if="!isMobile" v-for="(s, index) in ships" :key="s.id" :ship="s" :index="index" />
            <ship-summary-small v-if="isMobile" v-for="(s, index) in ships" :key="s.id" :ship="s" :index="index" />
        </div>
        <div class="no-ships" v-else>
            No ships currently listed
        </div>
    </div>
</template>

<script>
import { gsap } from 'gsap'
import ShipSummary from '@/components/fleet/ShipSummary'
import ShipSummarySmall from '@/components/fleet/ShipSummarySmall'

export default {
    name: "fleet-view",
    components: {
        ShipSummary,
        ShipSummarySmall
    },
    props: {
        ships: {
            type: Array,
            default: function () {
                return []
            }
        }
    },
    data() {
        return {
        }
    },
    mounted() {
        gsap.to(".ships", {duration: 1, opacity: 1})
    }
}
</script>

<style scoped>
    .fleet-view {
        position: relative;
        margin-bottom: 20px;
        margin-left: -5px;
        margin-right: -5px;
    }
    .no-ships {
        text-align: center;
        font-size: 18px;
        color: #dbf3ff;
    }
    .ships {
        display: flex;
        flex-wrap: wrap;
        opacity: 1;
    }
</style>