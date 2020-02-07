<template>
    <div class="poi-list">
        <div v-if="pois.length > 0" class="pois">
            <location-summary v-for="(loc, index) in pois" :key="loc.code" :loc="loc" :link="getLink(loc.code)" :index="index">
                <div>Type: {{ loc.subtype }}</div>
                <div>Affiliation: {{ loc.affiliation }}</div>
                <div>Location: {{ loc.parent }}</div>
            </location-summary>
        </div>
        <div class="no-pois" v-else>
            No POIs found near this location
        </div>
    </div>
</template>

<script>
import { gsap } from 'gsap'
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
        getLink(code) {
            return `/poi/${code.split(".")[2]}`
        },
        show() {
            gsap.to(".poi-list", 1, {opacity: 1})
        }
    },
    mounted() {
        if(this.pois) {
            this.show()
        }
    },
    watch: {
        pois: {
            handler: function() {
                this.show()
            }
        }
    }
}
</script>

<style scoped>
    .poi-list {
        position: relative;
        margin-bottom: 20px;
        margin-left: -5px;
        margin-right: -5px;
        opacity: 0;
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