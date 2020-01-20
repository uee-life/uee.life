<template>
    <div>
        Home
        <ul>
            <li class="line-item">
                <div>System:</div>
                <template v-if="editing">
                    <select v-model="system">
                        <option disabled value="">Select System</option>
                        <option value="">Not Selected</option>
                        <option v-for="loc in data.systems" :key="loc.id" :value="{id: loc.id, name: loc.name}">{{ loc.name }}</option>
                    </select>
                </template>
                <div v-else-if="home.system"><router-link :to="systemLink">{{home.system.name}}</router-link></div>
                <div v-else>Unknown</div>
            </li>
            <li class="line-item">
                <div>Location:</div>
                <template v-if="editing">
                    <select v-if="system && data.locations.length" v-model="location">
                        <option disabled value="">Select Location</option>
                        <option value="">Not Selected</option>
                        <option v-for="loc in data.locations" :key="loc.id" :value="{id: loc.id, name: loc.name}">{{ loc.name }}</option>
                    </select>
                </template>
                <div v-else-if="home.location"><router-link :to="locationLink">{{home.location.name}}</router-link></div>
                <div v-else>Unknown</div>
            </li>
            <li class="line-item">
                <div>Base:</div>
                <template v-if="editing">
                    <select v-if="location && data.bases.length" v-model="base">
                        <option disabled value="">Select Home Base</option>
                        <option value="">Not Selected</option>
                        <option v-for="loc in data.bases" :key="loc.id" :value="{id: loc.id, name: loc.name}">{{ loc.name }}</option>
                    </select>
                </template>
                <div v-else-if="home.base"><router-link :to="baseLink">{{home.base.name}}</router-link></div>
                <div v-else>Unknown</div>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from "axios"
import { mapGetters, mapActions, mapMutations } from 'vuex'

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
        ...mapGetters([
            'loggedUser',
            'accessToken'
        ]),
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
        ...mapMutations({
            setSaving: 'SET_SAVING'
        }),
        ...mapActions([
            'setCitizen'
        ]),
        loadSystems() {
            axios({
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
                axios({
                    url: `https://api.uee.life/systems/${this.system.name}/planets`,
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
                axios({
                    url: `https://api.uee.life/planets/${this.location.name}/pois`,
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
        save() {
            console.log('saving location data...')
            this.setSaving(true)
            const data = {
                system: this.system,
                location: this.location,
                base: this.base
            }
            axios({
                url: `https://api.uee.life/citizen/${this.loggedUser.handle}/location`,
                method: 'POST',
                headers: {
                    'Content-Type': "application/json; charset=utf-8",
                    Authorization: `Bearer ${this.accessToken}`
                },
                data: data
            }).then((res) => {
                console.log(res.data.user.citizen)
                this.setCitizen(res.data.user.citizen)
                this.setSaving(false)
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