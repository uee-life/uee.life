<template>
    <form @submit.prevent="updatePOI">
            <div>Select System:
            <select v-model="system">
                <option v-for="sys in systems" :key="sys.id" :value="sys.id">{{ sys.name }}</option>
            </select></div>
            <div>Select Location: 
            <select v-model="location">
                <option v-for="loc in locations" :key="loc.id" :value="loc.id">{{ loc.name }}</option>
            </select></div>
            <div>name <input type=text v-model="name"></div>
            <div>code <input type=text v-model="code"></div>
            <div>description<br><textarea type=text v-model="description"></textarea></div>
            <button type="submit">Compute</button>
    </form>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            system: null,
            location: null,
            name: null,
            code: null,
            description: null,
            systems: null,
            locations: null
        }
    },
    methods: {
        updatePOI() {
            console.log('updating...')
        },
        loadData(poi) {
            console.log(poi)
            this.system = poi.system_id
            this.location = poi.parent_id
            this.name = poi.name
            this.description = poi.description
            this.code = poi.code
        },
        async getPoi() {
            const poi = this.$route.params.poi
            axios.get(`https://api.uee.life/pois/${poi}`).then(res => {
                if(res.status == 200) {
                    this.loadData(res.data)
                }
            }).catch(error => {
                // eslint-disable-next-line
                console.error(error)
            });
        },
        async getSystems(cb, errorCb) {
            axios({
                url: 'https://api.uee.life/systems',
                method: 'GET'
            }).then((res) => {
                this.systems = res.data
            }).catch((err) => {
                console.error(err)
            })
        },
        async getLocations(cb, errorCb) {
            axios({
                url: `https://api.uee.life/systems/${this.system}/locations`,
                method: 'GET'
            }).then((res) => {
                this.locations = res.data
            }).catch((err) => {
                console.error(err)
            })
        },
    },
    mounted() {
        this.getSystems()
        this.getPoi()
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