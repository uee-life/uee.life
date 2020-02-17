<template>
    <div id="location-list" class="location-list">
        <div v-if="locations.length > 0" class="locations">
            <location-summary v-for="(loc, index) in locations" :key="loc.code" :loc="loc" :link="getLink(loc.code)" :index="index">
                <div>Type: {{ loc.subtype }}</div>
                <div>Affiliation: {{ loc.affiliation }}</div>
                <div>Habitable: {{ isHabitable(loc) }}</div>
            </location-summary>
        </div>
        <div class="no-locations" v-else>
            No locations found here
        </div>
    </div>
</template>

<script>
import { gsap } from 'gsap'
import LocationSummary from '@/components/location/LocationSummary.vue'

export default {
    name: "planet-list",
    components: {
        LocationSummary
    },
    props: {
        locations: {
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
        getLink(code) {
            return `/discover/${code}`
        },
        isHabitable(loc) {
            if(loc.habitable) {
                return "Yes"
            } else {
                return "No"
            }
        },
        show() {
            gsap.to(".location-list", 1, {opacity: 1})
        }
    },
    mounted() {
        if(this.locations) {
            this.show()
        }
    },
    watch: {
        locations: {
            handler: function() {
                this.show()
            }
        }
    }
}
</script>

<style scoped>
    .location-list {
        position: relative;
        margin-bottom: 20px;
        margin-left: -5px;
        margin-right: -5px;
        opacity: 0;
    }
    .no-locations {
        text-align: center;
        font-size: 18px;
        color: #dbf3ff;
    }
    .locations {
        display: flex;
        flex-wrap: wrap;
        opacity: 1;
    }
</style>