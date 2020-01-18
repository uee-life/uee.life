<template>
    <div id="moon-list" class="moon-list">
        <div v-if="satellites.length > 0" class="moons">
            <location-summary v-for="(loc, index) in satellites" :key="loc.code" :loc="loc" :link="getLink(loc.name)" :index="index">
                <div>Type: {{ loc.subtype }}</div>
                <div>Affiliation: {{ loc.affiliation }}</div>
                <div>Habitable: {{ isHabitable(loc) }}</div>
            </location-summary>
        </div>
        <div class="no-moons" v-else>
            No moons found near this planet
        </div>
    </div>
</template>

<script>
import { gsap } from 'gsap'
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
        },
        isHabitable(loc) {
            if(loc.habitable) {
                return 'Yes'
            } else {
                return 'No'
            }
        },
        show() {
            gsap.to(".moon-list", 1, {opacity: 1})
        }
    },
    mounted() {
        if(this.satellites) {
            this.show()
        }
    },
    watch: {
        satellites: {
            handler: function() {
                this.show()
            }
        }
    }
}
</script>

<style scoped>
    .moon-list {
        position: relative;
        margin-bottom: 20px;
        margin-left: -10px;
        margin-right: -10px;
        opacity: 0;
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