<template>
    <div class="poi">
        <portal to="leftDock">
            <dock-item title="nav">
            <div v-if="poi" class="left-nav-button"><router-link :to="systemLink">System: {{poi.system}}</router-link></div>
            <div v-if="poi" class="left-nav-button"><router-link :to="planetLink">Location: {{poi.parent}}</router-link></div>
            <div class="left-nav-button"><a target="_blank" :href="starmapLink">Open in Starmap</a></div>
            </dock-item>
        </portal>
        <location :location="poi" type="POI" />
    </div>
</template>

<script>
import Location from '@/components/location/Location.vue'

export default {
    layout: ({ isMobile }) => isMobile ? 'mobile' : 'default',
    name: "poi",
    components: {
        Location
    },
    data() {
        return {
            poi: {}
        }
    },
    methods: {
        async getPoi() {
            const poi = this.$route.params.poi
            this.$axios({
                url: `https://api.uee.life/pois/${poi}`,
                method: 'GET'
            }).then((res) => {
                if(res.status == 200) {
                    this.poi = res.data
                }
            }).catch(error => {
                // eslint-disable-next-line
                console.error(error)
            })
        }
    },
    computed: {
        starmapLink() {
            if(this.poi.system) {
                return `https://robertsspaceindustries.com/starmap?location=${this.poi.code}&system=${this.poi.system.toUpperCase()}`
            } else {
                return ""
            }
        },
        systemLink() {
            if(this.poi) {
                return `/discover/${this.poi.system}`
            } else {
                return ''
            }
        },
        planetLink() {
            return `/discover/${this.poi.system}/${this.poi.parent}`
        }
    },
    mounted() {
        this.getPoi()
    },
    watch: {
        $route: {
            handler: function () {
                this.getPoi();
            }
        }
    }
}
</script>

<style scoped>
    .poi {
        width: 100%;
        display: flex;
    }
</style>