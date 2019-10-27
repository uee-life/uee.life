<template>
  <div class="location" id="location">
      <left-nav />
      <geomap :location="location"/>
      <location-data :location="location"/>
  </div>
</template>

<script>
import LeftNav from '@/components/LeftNav.vue'
import LocationData from '@/components/location/LocationData.vue'
import Geomap from '@/components/location/Geomap.vue'

export default {
    name: "location",
    components: {
        LocationData,
        Geomap,
        LeftNav
    },
    data() {
        return {
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
                type: "",
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
                const response = await fetch('https://www.capnflint.com:4444/stargps/location?foobar', {
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
    },
    beforeRouteUpdate (to, from, next) {
        this.location.POIs = [];
        x3dom.reload();
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