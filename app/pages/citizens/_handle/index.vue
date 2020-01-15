<template>
  <div>
    <portal to="leftDock">
      <left-nav />
      <citizen-tools />
    </portal>
    <portal to="rightDock">
        <citizen-org :citizen="citizen"/>
    </portal>
    <portal to="navigationPane">
      <div class="left-nav-button"><router-link to="/citizens">Search Citizens</router-link></div>
      <div class="left-nav-button"><a :href="dossierLink" target="_blank">Official Dossier</a></div>
    </portal>

    <citizen-info :citizen="citizen"/>
    <div>
        <tabs :tabs="tabs" :initialTab="initialTab">
            <template slot="tab-title-info">
                INFO
            </template>
            <template slot="tab-content-info">
                <citizen-bio :bio="citizen.info.bio"/>
            </template>

            <template slot="tab-title-ships">
                SHIPS
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
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

import CitizenInfo from '@/components/citizen/CitizenInfo'
import CitizenBio from '@/components/citizen/CitizenBio'
import CitizenOrg from '@/components/citizen/CitizenOrg'
import CitizenTools from '@/components/citizen/CitizenTools'

export default {
  asyncData() {
    return {
        tabs: ['info', 'ships'],
        initialTab: 'info', 
        citizen: {
            info: {},
            home: {},
            ships: [],
            org: {},
            links: []
        }
    }
  },
  components: {
    CitizenInfo,
    CitizenBio,
    CitizenOrg,
    CitizenTools
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
            const meta = this.loggedUser["https://uee.life/app_metadata"]
            if(meta && meta.handle == this.citizen.info.handle && meta.handle_verified) {
                return true
            }
            return false
        }
  },
    methods: {
        async getCitizen(skipcache=false) {
            try {
                let headers = {}
                if(skipcache) {
                    headers = {
                        skipcache: 1
                    }
                }
                const { data } = await axios.get('https://api.uee.life/citizen/' + this.$route.params.handle, {
                    headers: headers
                })

                this.citizen.info = data.info
                this.citizen.home = data.location
                this.citizen.ships = data.ships
                this.citizen.links = []
                if(data.info.website){
                    this.citizen.links.push({text: "Website", url: data.info.website})
                }
                if(data.info.org) {
                    await this.getOrg()
                } else {
                    this.citizen.org = {}
                }
            } catch (error) {
                // eslint-disable-next-line
                console.error(error)
            }

            this.loading = false
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
    },
    watch: {
        $route() {
            if(this.$route.params.handle) {
                this.getCitizen()
            }
        }
    }
}
</script>

<style>

</style>