<template>
  <div class='citizen'>
    <portal to="leftDock">
      <left-nav />
    </portal>
    <portal to="rightDock">
        <citizen-tools v-if="isOwner" @syncSuccess="refresh" @edit="edit" @save="save" :editing="editing"/>
        <citizen-org v-if="citizen.org" :citizen="citizen"/>
    </portal>
    <portal to="navigationPane">
      <div class="left-nav-button"><router-link to="/citizens">Search Citizens</router-link></div>
      <div class="left-nav-button"><a :href="dossierLink" target="_blank">Official Dossier</a></div>
    </portal>
    <div v-if="loading" class="loading">
        <img src="~/assets/loading.gif" >
    </div>
    <template v-else-if="citizen.info">
        <citizen-info :citizen="citizen" :editing="editing"/>
        <div class="citizen-tabs">
            <tabs :tabs="tabs" :initialTab="initialTab">
                <template slot="tab-title-info">
                    INFO
                </template>
                <template slot="tab-content-info">
                    <citizen-bio :bio="citizen.info.bio"/>
                </template>

                <template slot="tab-title-ships">
                    SHIPS ({{ citizen.ships.length }})
                </template>
                <template slot="tab-content-ships">
                    <fleet-view :ships="citizen.ships"/>
                </template>

                <template v-if="isAuthenticated && isOwner" slot="tab-title-location">
                    LOCATION
                </template>
                <template v-if="isAuthenticated && isOwner" slot="tab-content-location">
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
import axios from 'axios'
import { mapGetters } from 'vuex'

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
            tabs: ['info', 'ships'],
            initialTab: 'info', 
            citizen: {
                info: {},
                home: {},
                ships: [],
                org: null,
                links: []
            },
            editing: false,
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
        ...mapGetters([
            'isAuthenticated', 
            'loggedUser'
        ]),
        dossierLink() {
            return `https://robertsspaceindustries.com/citizens/${this.$route.params.handle}`
        },
        isOwner() {
            if(this.loggedUser && this.loggedUser.handle == this.citizen.info.handle && this.loggedUser.handle_verified) {
                return true
            }
            return false
        },
        saving() {
            return this.$store.state.saving
        }
    },
    methods: {
        edit() {
            this.editing = true
        },
        save() {
            this.editing = false
        },
        async getCitizen(skipcache=false) {
            let headers = {}
            if(skipcache) {
                headers = {
                    skipcache: 1
                }
            }
            axios({
                url: `https://api.uee.life/citizen/${this.$route.params.handle}`,
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
            axios({
                url: `https://api.uee.life/citizen/${this.$route.params.handle}/ships`,
                method: 'GET'
            }).then((res) => {
                this.citizen.ships = res.data
            }).catch((err) => {
                console.error(err)
            })
        },
        async getOrg() {
            try {
                const { data } = await axios.get('https://api.uee.life/organization/' + this.citizen.info.org)

                this.citizen.org = data
            } catch (error) {
                // eslint-disable-next-line
                console.error(error)
            }
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
        },
        saving() {
            console.log("refreshing after save")
            if(!this.saving) {
                this.refresh()
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