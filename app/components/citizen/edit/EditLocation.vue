<template>
  <div>
      Current Location: {{ current.system }} - {{ current.location }} - {{ current.base }}<br>
      Selected Location: {{ system }} - {{ location }} - {{ base }}<br>
      <select v-model="system">
          <option disabled value="">Select System</option>
          <option v-for="loc in systems" :key="loc.id" :value="{id: loc.id, name: loc.name}">{{ loc.name }}</option>
      </select><br />
      <select v-if="system && locations.length" v-model="location">
          <option disabled value="">Select Location</option>
          <option v-for="loc in locations" :key="loc.id" :value="{id: loc.id, name: loc.name}">{{ loc.name }}</option>
      </select><br />
        <select v-if="location && bases.length" v-model="base">
          <option disabled value="">Select Home Base</option>
          <option v-for="loc in bases" :key="loc.id" :value="{id: loc.id, name: loc.name}">{{ loc.name }}</option>
      </select><br />
  </div>
</template>

<script>

export default {
    name: 'edit-location',
    props: ['current'],
    data() {
        return {
            system: null,
            systems: [{id: 1, name: "stanton"},{id: 2, name: "pyro"}],
            location: null,
            locations: [{id: 1, name: "Hurston"},{id: 2, name: "Crusader"}],
            base: null,
            bases: [{id: 1, name: "Lorville"},{id: 2, name: "Area 18"}]
        }
    },
    methods: {
        loadSystems() {
            this.getSystems((res) => {
                this.systems = res.data
            }, (err) => {
                console.error(err)
            })
        },
        loadLocations() {
            this.getLocations((res) => {
                this.locations = res.data
            }, (err) => {
                console.error(err)
            })
        },
        loadPOIs() {
            this.getPOIs((res) => {
                this.bases = res.data
            }, (err) => {
                console.error(err)
            })
        },
        getSystems(cb, errorCb) {
            this.$axios({
                url: 'https://api.uee.life/systems',
                method: 'GET'
            }).then((data) => {
                cb(data)
            }).catch((err) => {
                errorCb(err)
            })
        },
        getLocations(cb, errorCb) {
            this.$axios({
                url: `https://api.uee.life/systems/${this.system.name}/planets`,
                method: 'GET'
            }).then((data) => {
                cb(data)
            }).catch((err) => {
                errorCb(err)
            })
        },
        getPOIs(cb, errorCb) {
            console.log(this.location.name)
            this.$axios({
                url: `https://api.uee.life/planets/${this.location.name}/pois`,
                method: 'GET'
            }).then((data) => {
                cb(data)
            }).catch((err) => {
                errorCb(err)
            })
        },
    },
    mounted() {
        this.loadSystems()
    },
    watch: {
        system() {
            if(this.system) {
                this.loadLocations()
                this.location = null
                this.base = null
            }
        },
        location() {
            if(this.location) {
                this.loadPOIs()
                this.base = null
            }
        }
    }
}
</script>

<style>

</style>