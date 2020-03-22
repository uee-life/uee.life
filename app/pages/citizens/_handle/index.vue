<template>
  <div class='citizen'>
    <portal to="leftDock">
        <dock-item title="Navigation" class="left-nav">
            <div class="left-nav-button"><router-link to="/citizens">Search Citizens</router-link></div>
            <div class="left-nav-button"><a :href="dossierLink" target="_blank">Official Dossier</a></div>
        </dock-item>
        <dock-item v-if="citizen.links.length > 0" title="Citizen links">
            <div v-for="link in citizen.links" :key="link.url" class="link">
                <div class="left-nav-button"><a :href="link.url" target="_blank">{{link.text}}</a></div>
            </div>
        </dock-item>
    </portal>
    <portal to="rightDock">
        <citizen-tools v-if="isOwner" @syncSuccess="refresh" @edit="edit" @save="save" :editing="editing"/>
        <citizen-org v-if="citizen.org" :citizen="citizen"/>
    </portal>

    <div v-if="loading" class="loading">
        <img src="~/assets/loading.gif" >
    </div>
    <template v-else-if="citizen.info">
        <citizen-info :citizen="citizen" :editing="editing"/>
        <citizen-bio :bio="citizen.info.bio"/>
        <div class="citizen-tabs">
            <tabs :tabs="tabs" :initialTab="initialTab">
                <template slot="tab-title-ships">
                    SHIPS ({{ citizen.ships.length }})
                </template>
                <template slot="tab-content-ships">
                    <fleet-view :isOwner="isOwner" :ships="citizen.ships" @add="addShip" @remove="removeShip"/>
                </template>

                <template v-if="$auth.loggedIn && isOwner" slot="tab-title-location">
                    LOCATION
                </template>
                <template v-if="$auth.loggedIn && isOwner" slot="tab-content-location">
                    <citizen-location :citizen="citizen"/>
                </template>
            </tabs>
        </div>
    </template>
    <template v-else>
        <h3>Citizen Not Found...</h3>
    </template>
  </div>
</template>

<script>
import Vue from 'vue'

import CitizenInfo from '@/components/citizen/CitizenInfo'
import CitizenBio from '@/components/citizen/CitizenBio'
import CitizenOrg from '@/components/citizen/CitizenOrg'
import CitizenTools from '@/components/citizen/CitizenTools'

import FleetView from '@/components/fleet/FleetView'

export default {
    layout: ({ isMobile }) => isMobile ? 'mobile' : 'default',
    name: 'citizen',
    data() {
        return {
            tabs: ['ships'],
            initialTab: 'ships', 
            citizen: {
                info: {
                    handle: ''
                },
                home: {},
                ships: [],
                org: null,
                links: []
            },
            editing: false,
            showModal: true,
            loading: true
        }
    },
    components: {
        CitizenInfo,
        CitizenBio,
        CitizenOrg,
        CitizenTools,
        FleetView
    },
    computed: {
        user() {
            return this.$auth.user
        },
        dossierLink() {
            return `https://robertsspaceindustries.com/citizens/${this.$route.params.handle}`
        },
        isOwner() {
            if(this.$auth.loggedIn && this.user.app_metadata.handle_verified && this.user.app_metadata.handle.toLowerCase().trim() === this.citizen.info.handle.toLowerCase().trim()) {
                return true
            }
            return false
        }
    },
    methods: {
        edit() {
            this.editing = true
        },
        save() {
            this.editing = false
            this.refresh()
        },
        async addShip(ship) {
            console.log("adding ship", ship)
            this.$axios({
                url: `https://api.uee.life/citizens/${this.$route.params.handle}/ships`,
                method: 'POST',
                headers: {
                    'Content-type': 'application/json; charset=utf-8'
                },
                data: ship 
            }).then((res) => {
                this.getShips()
            }).catch((err) => {
                console.error(err)
            })
        },
        async removeShip(ship) {
            console.log("removing ship", ship)
            this.$axios({
                url: `https://api.uee.life/citizens/${this.$route.params.handle}/ships/${ship}`,
                method: 'DELETE'
            }).then((res) => {
                console.log('done')
                this.getShips()
            }).catch((err) => {
                console.error(err)
            })
        },
        async getCitizen(skipcache=false) {
            let headers = {}
            if(skipcache) {
                headers = {
                    skipcache: 1
                }
            }
            this.$axios({
                url: `https://api.uee.life/citizens/${this.$route.params.handle}`,
                method: 'GET',
                headers: headers
            }).then(async (res) => {
                this.citizen.info = res.data.info
                this.citizen.home = res.data.home
                this.citizen.links = []
                if(res.data.info && res.data.info.website){
                    this.citizen.links.push({text: "Website", url: res.data.info.website})
                }
                if(res.data.info && res.data.info.org) {
                    await this.getOrg()
                } else {
                    this.citizen.org = null
                }
            }).catch((err) => {
                console.error(err)
            })

            this.loading = false
        },
        async getShips() {
            this.$axios({
                url: `https://api.uee.life/citizens/${this.$route.params.handle}/ships`,
                method: 'GET'
            }).then((res) => {
                this.citizen.ships = res.data
            }).catch((err) => {
                console.error(err)
            })
        },
        async getOrg() {
            this.$axios({
                url: 'https://api.uee.life/orgs/' + this.citizen.info.org,
                method: 'GET'
            }).then((res) => {
                this.citizen.org = res.data
            }).catch((error) => {
                // eslint-disable-next-line
                console.error(error)
            })
            this.loading = false
        },
        refresh() {
            this.getCitizen(true)
        }
    },
    mounted() {
        this.getCitizen()
        this.getShips()
    },
    watch: {
        $route() {
            if(this.$route.params && this.$route.params.handle) {
                this.getCitizen()
                this.getShips()
            }
        }
    }
}
</script>

<style>
.citizen.content {
    margin-top: 20px;
}

.citizen-tabs {
    margin-top: 20px;
}
</style>