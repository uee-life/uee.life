<template>
    <form @submit.prevent="updatePOI">
            <div>Select System:
            <select v-model="system">
                <option v-for="sys in systems" :key="sys.id" :value="sys.name">{{ sys.name }}</option>
            </select></div>
            <div>Select Location: 
            <select v-model="bounds">
                <option v-for="loc in locations" :key="loc.id" :value="loc.om_radius * 2">{{ loc.name }}</option>
            </select></div>
            <div>name <input type=text v-model="name"></div>
            <div>description <input type=text v-model="description"></div>
            <button type="submit">Compute</button>
    </form>
</template>

<script>
export default {
    props: ["poi"],
    data() {
        return {
            name: poi.name,
            description: poi.description,
            code: poi.code,
            type: poi.type,
            subtype: poi.subtype,
            affiliation: poi.affiliation,
            habitable: poi.habitable,
            danger: poi.danger,
            economy: poi.economy,
            population: poi.population,
            thumbnail: poi.thumbnail,
            parent: poi.parent,
            parent_id: poi.parent_id,
            system: poi.system,
            system_id: poi.system_id,
            coords: poi.coords,
            custom: poi.custom
        }
    },
    methods: {
        updatePOI() {
            console.log('updating...')
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
            console.log(this.system.name)
            this.$axios({
                url: `https://api.uee.life/systems/${this.system.code}/planets`,
                method: 'GET'
            }).then((data) => {
                cb(data)
            }).catch((err) => {
                errorCb(err)
            })
        },
    },
    mounted() {
        this.getSystems()
    },
    watch: {
        system() {
            if(this.system) {
                this.getLocations()
                this.location = null
            }
        }
    }
}
</script>

<style>

</style>