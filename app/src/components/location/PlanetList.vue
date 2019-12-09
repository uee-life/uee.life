<template>
    <div id="planet-list" class="planet-list">
        <div v-if="planets.length > 0" class="planets">
            <location-summary v-for="(loc, index) in planets" :key="loc.code" :loc="loc" :link="getLink(loc.name)" :index="index">
                <div>Type: {{ loc.subtype }}</div>
                <div>Affiliation: {{ loc.affiliation }}</div>
                <div>Habitable: {{ isHabitable(loc) }}</div>
            </location-summary>
        </div>
        <div class="no-planets" v-else>
            No planets found in system
        </div>
    </div>
</template>

<script>
import { TimelineLite } from 'gsap'
import LocationSummary from '@/components/location/LocationSummary.vue'

export default {
    name: "planet-list",
    components: {
        LocationSummary
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
    methods: {
        getLink(locName) {
            return `/planet/${locName}`
        },
        isHabitable(loc) {
            if(loc.habitable) {
                return "Yes"
            } else {
                return "No"
            }
        },
        show() {
            const tl = new TimelineLite()
            tl.to(".planet-list", 1, {opacity: 1})
        }
    },
    mounted() {
        if(this.planets) {
            this.show()
        }
    },
    watch: {
        planets: {
            handler: function() {
                this.show()
            }
        }
    }
}
</script>

<style scoped>
    .planet-list {
        position: relative;
        margin-bottom: 20px;
        margin-left: -5px;
        margin-right: -5px;
        opacity: 0;
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