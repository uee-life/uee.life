<template>
    <div class="poi-list">
        <section-title text="Points of Interest" size="medium"/>
        <div v-if="pois.length > 0" class="pois">
            <location-summary v-for="(loc, index) in pois" :key="loc.code" :loc="loc" :link="getLink(loc.name)" :index="index">
            </location-summary>
        </div>
        <div class="no-pois" v-else>
            No POIs found near this location
        </div>
    </div>
</template>

<script>
import { TimelineLite } from 'gsap'
import LocationSummary from '@/components/location/LocationSummary.vue'

export default {
    name: "poi-list",
    components: {
        LocationSummary
    },
    props: {
        pois: {
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
            return `/poi/${locName}`
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
    .poi-list {
        position: relative;
        margin-bottom: 20px;
        padding-top: 10px;
        margin-left: -5px;
        margin-right: -5px;
    }
    .no-pois {
        text-align: center;
        font-size: 18px;
        color: #dbf3ff;
    }
    .pois {
        display: flex;
        flex-wrap: wrap;
        opacity: 1;
    }
</style>