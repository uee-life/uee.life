<template>
    <div class="citizen-location">
        <div class="location-row">
            <span class="label">System:</span>
            <template v-if="editing">
                <select v-model="system">
                    <option disabled value="">Select System</option>
                    <option value="">Not Selected</option>
                    <option v-for="loc in data.systems" :key="loc.id" :value="{id: loc.id, code: loc.code, name: loc.name}">{{ loc.name }}</option>
                </select>
            </template>
            <span v-else-if="home.system"><router-link :to="systemLink">{{home.system.name}}</router-link></span>
            <span v-else>Unknown</span>
        </div>
        <div class="location-row">
            <span class="label">Location:</span>
            <template v-if="editing">
                <select v-if="system && data.locations.length" v-model="location">
                    <option disabled value="">Select Location</option>
                    <option value="">Not Selected</option>
                    <option v-for="loc in data.locations" :key="loc.id" :value="{id: loc.id, code: loc.code, name: loc.name}">{{ loc.name }}</option>
                </select>
            </template>
            <div v-else-if="home.location"><router-link :to="locationLink">{{home.location.name}}</router-link></div>
            <div v-else>Unknown</div>
        </div>
        <div class="location-row">
            <span class="label">Base:</span>
            <template v-if="editing">
                <select v-if="location && data.bases.length" v-model="base">
                    <option disabled value="">Select Home Base</option>
                    <option value="">Not Selected</option>
                    <option v-for="loc in data.bases" :key="loc.id" :value="{id: loc.id, name: loc.name}">{{ loc.name }}</option>
                </select>
            </template>
            <div v-else-if="home.base"><router-link :to="baseLink">{{home.base.name}}</router-link></div>
            <div v-else>Unknown</div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'

export default {
    name: 'citizen-location',
    props: ['home', 'editing'],
    data() {
        return {
            system: null,
            location: null,
            base: null,
            data: {
                systems: [],
                locations: [],
                bases: []
            }
        }
    },
    computed: {
        user() {
            return this.$auth.user
        },
        systemLink() {
            return `/system/${this.home.system.name}`
        },
        locationLink() {
            return `/planet/${this.home.location.name}`
        },
        baseLink() {
            return `/poi/${this.home.base.name}`
        }
    },
    methods: {
        ...mapActions([
            'setCitizen'
        ]),
        loadSystems() {
            this.$axios({
                url: 'https://api.uee.life/systems',
                method: 'GET'
            }).then((res) => {
                this.data.systems = res.data
                if(this.home.system) {
                    console.log('setting system')
                    this.system = this.home.system
                }
            }).catch((err) => {
                console.error(err)
            })
        },
        loadLocations() {
            if(this.system) {
                this.$axios({
                    url: `https://api.uee.life/locations/${this.system.name}/locations`,
                    method: 'GET'
                }).then((res) => {
                    this.data.locations = res.data
                    if(this.home.location) {
                        this.location = this.home.location
                    } else {
                        this.location = null
                    }
                }).catch((err) => {
                    console.error(err)
                })
            }
        },
        loadPOIs() {
            if(this.location) {
                this.$axios({
                    url: `https://api.uee.life/locations/${this.location.code}/pois`,
                    method: 'GET'
                }).then((res) => {
                    this.data.bases = res.data
                    if(this.home.base) {
                        this.base = this.home.base
                    } else {
                        this.base = null
                    }
                }).catch((err) => {
                    console.error(err)
                })
            }
        },
        async save() {
            console.log('saving location data...')
            const data = {
                system: this.system,
                location: this.location,
                base: this.base
            }
            await this.$axios({
                url: `https://api.uee.life/citizens/${this.user['https://uee.life/app_metadata'].handle}/location`,
                method: 'PUT',
                headers: {
                    'Content-Type': "application/json; charset=utf-8"
                },
                data: data
            }).then((res) => {
                console.log(res.data.user.citizen)
                this.setCitizen(res.data.user.citizen)
            }).catch((err) => {
                console.error(err)
            })
        }
    },
    watch: {
        home: function() {
            this.loadSystems()
        },
        system: function() {
            if(this.system) {
                this.loadLocations()
            }
            this.location = null
            this.base = null
        },
        location: function() {
            if(this.location) {
                this.loadPOIs()
            }
            this.base = null
        },
        editing: function() {
            if(!this.editing) {
                this.save()
            }
        }
    }
}
</script>

<style scoped>
    .citizen-location {
        display: flex;
        flex-direction: column;
    }
    .location-row {
        display: flex;
        flex-grow: 1;
    }
    .location-row .label {
        width: 70px;
    }
    .citizen-location .labels {
        display: flex;
        flex-direction: column;
        font-family: 'Michroma';
        font-size: 12px;
        text-transform: uppercase;
    }
    .citizen-location .data {
        display: flex;
        flex-direction: column;
        font-size: 14px;
        line-height: 19.5px;
        margin-left: 10px;
        color: #dbf3ff;
    }
    .line-item {
        display: flex;
        justify-content: space-between;
    }

    .line-item select {
        color: #39ced8;
        background: url('/images/fading-bars.png') repeat;
        border: 1px solid #546f84;
        margin: 2px;
    }

    .line-item select option {
        background-color: rgb(13, 46, 66);
    }
</style>