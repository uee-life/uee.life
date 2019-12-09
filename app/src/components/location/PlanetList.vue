<template>
    <div id="planet-list" class="planet-list">
        <section-title text="Planets" size="medium"/>
        <div v-if="planets.length > 0" class="planets">
            <planet-summary v-for="(p, index) in planets" :key="p.code" :planet="p" :index="index">
            </planet-summary>
        </div>
        <div class="no-planets" v-else>
            No planets found in system
        </div>
    </div>
</template>

<script>
import { TimelineLite } from 'gsap'
import PlanetSummary from '@/components/location/PlanetSummary.vue'

export default {
    name: "planet-list",
    components: {
        PlanetSummary
    },
    props: {
        planets: {
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
        const tl = new TimelineLite()
        tl.to(".planet-list .section-title", 1, {opacity: 1})
        tl.to(".planets", 2, {opacity: 1})
    }
}
</script>

<style scoped>
    .planet-list {
        position: relative;
        margin-bottom: 20px;
        padding-top: 10px;
        padding-left: -5px;
        padding-right: -5px;
    }
    .no-planets {
        text-align: center;
        font-size: 18px;
        color: #dbf3ff;
    }
    .planets {
        display: flex;
        flex-wrap: wrap;
        opacity: 1;
    }
</style>