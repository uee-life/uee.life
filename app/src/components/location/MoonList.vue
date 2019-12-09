<template>
    <div id="moon-list" class="moon-list">
        <section-title text="Moons" size="medium"/>
        <div v-if="satellites.length > 0" class="moons">
            <location-summary v-for="(loc, index) in satellites" :key="loc.code" :loc="loc" :link="getLink(loc.name)" :index="index">
                <div>Type: {{ loc.subtype }}</div>
                <div>Affiliation: {{ loc.affiliation }}</div>
                <div>Habitable: {{ isHabitable }}</div>
            </location-summary>
        </div>
        <div class="no-moons" v-else>
            No moons found near this planet
        </div>
    </div>
</template>

<script>
import { TimelineLite } from 'gsap'
import LocationSummary from '@/components/location/LocationSummary.vue'

export default {
    name: "moon-list",
    components: {
        LocationSummary
    },
    props: {
        satellites: {
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
    methods: {
        getLink(locName) {
            return `/satellite/${locName}`
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
        margin-left: -5px;
        margin-right: -5px;
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