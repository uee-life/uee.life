<template>
    <div class="satellite">
        <portal to="leftDock">
            <dock-item title="nav">
            <div v-if="satellite" class="left-nav-button"><router-link :to="systemLink">System: {{satellite.system}}</router-link></div>
            <div v-if="satellite" class="left-nav-button"><router-link :to="planetLink">Planet: {{satellite.planet}}</router-link></div>
            <div class="left-nav-button"><a target="_blank" :href="starmapLink">Open in Starmap</a></div>
            </dock-item>
            <location :location="satellite" type="Satellite">
        </location>
        </portal>
    </div>
</template>

<script>
import Location from '@/components/location/Location.vue'

export default {
    layout: ({ isMobile }) => isMobile ? 'mobile' : 'default',
    name: "satellite",
    components: {
        Location
    },
    data() {
        return {
            satellite: {}
        }
    },
    methods: {
        async getSatellite() {
            const moon = this.$route.params.moon
            this.$axios.get(`https://api.uee.life/satellites/${moon}`).then(res => {
                if(res.status == 200) {
                    this.satellite = res.data
                }
            }).catch(error => {
                // eslint-disable-next-line
                console.error(error)
            });
        }
    },
    computed: {
        starmapLink() {
            if(this.satellite) {
                let system = ""
                if (this.satellite.system) {
                    system = this.satellite.system.toUpperCase()
                }
                return `https://robertsspaceindustries.com/starmap?location=${this.satellite.code}&system=${system}`
            } else {
                return ""
            }
        },
        systemLink() {
            return `/system/${this.satellite.system}`
        },
        planetLink() {
            return `/planet/${this.satellite.planet}`
        }
    },
    mounted() {
        this.getSatellite()
    },
    watch: {
        $route: {
            handler: function () {
                this.getSatellite();
            }
        }
    }
}
</script>

<style scoped>
    .satellite {
        width: 100%;
        display: flex;
        margin: 20px 10px 0;
    }
</style>