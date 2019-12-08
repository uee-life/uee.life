<template>
    <div id="moon-list" class="moon-list">
        <section-title text="Moons" size="medium"/>
        <div v-if="planets.length > 0" class="moons">
            <moon-summary v-for="(p, index) in sattelites" :key="p.code" :sattelite="p" :index="index">
            </moon-summary>
        </div>
        <div class="no-moons" v-else>
            No moons found near this planet
        </div>
    </div>
</template>

<script>
import { TimelineLite } from 'gsap'
import MoonSummary from '@/components/location/MoonSummary.vue'

export default {
    name: "moon-list",
    components: {
        MoonSummary
    },
    props: {
        sattelites: {
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
    .moon-list {
        position: relative;
        margin-bottom: 20px;
        padding-top: 10px;
    }
    .no-moons {
        text-align: center;
        font-size: 18px;
        color: #dbf3ff;
    }
    .moons {
        display: flex;
        flex-wrap: wrap;
        opacity: 1;
    }
</style>