<template>
  <div class="location" id="location">
      <left-dock />
        <portal to="navigationPane">
            <div v-for="link in links" :key="link.text" class="nav-button"><router-link :to="link.path">{{ link.text }}</router-link></div>
        </portal>
      <geomap :location="location" :v-if="renderComponent"/>
      <location-data :location="location"/>
  </div>
</template>

<script>
import LeftDock from '@/components/layout/LeftDock.vue'
import LocationData from '@/components/location/LocationData.vue'
import Geomap from '@/components/location/Geomap.vue'

export default {
    name: "location",
    components: {
        LocationData,
        Geomap,
        LeftDock
    },
    data() {
        return {
            renderComponent: true,
            links: [
                {
                text: "Daymar",
                path: "/location/Daymar"
                },
                {
                text: "Yela",
                path: "/location/Yela"
                }
            ],
            location: {
                name: "",
                parent: "",
                description: "",
                designation: "",
                POIs: [],
                id: 0,
                type: '',
                habitable: 0,
                atmo: 0,
                msl: 0,
                sattelites: [],
                subtype: "",
                om_radius: ""
            }
        }
    },
    mounted() {
        this.getLocation(this.$route.params.name)
    },
    methods: {
        async getLocation(location) {
            try {
                const response = await fetch('<need a new api>', {
                method: 'POST',
                body: JSON.stringify({query: location}),
                headers: { 'Content-type': 'application/json; charset=UTF-8'}
                })
                const data = await response.json()
                this.location = data['data']
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error(error) 
            }
        },
        forceRerender() {
            this.renderComponent = false;

            this.$nextTick(() => {
                this.renderComponent = true;
            });
        }
    },
    beforeRouteUpdate (to, from, next) {
        this.location.POIs = [];
        this.getLocation(to.params.name)
        next();
    }
}
</script>

<style>
    .location {
        display: flex;
    }
</style>