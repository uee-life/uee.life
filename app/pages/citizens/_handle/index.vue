<template>
  <div>
    <portal to="leftDock">
      <left-nav />
    </portal>
    <portal to="rightDock">
        <citizen-tools v-if="isOwner" @syncSuccess="refresh" @edit="edit" @save="save" :editing="editing"/>
        <citizen-org :citizen="citizen"/>
    </portal>
    <portal to="navigationPane">
      <div class="left-nav-button"><router-link to="/citizens">Search Citizens</router-link></div>
      <div class="left-nav-button"><a :href="dossierLink" target="_blank">Official Dossier</a></div>
    </portal>

    <citizen-info :citizen="citizen" :editing="editing"/>
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
import Vue from 'vue'
import axios from 'axios'
import { mapGetters } from 'vuex'

import CitizenInfo from '@/components/citizen/CitizenInfo'
import CitizenBio from '@/components/citizen/CitizenBio'
import CitizenOrg from '@/components/citizen/CitizenOrg'
import CitizenTools from '@/components/citizen/CitizenTools'

export default {
    layout: ({ isMobile }) => isMobile ? 'mobile' : 'default',
    data() {
        return {
            tabs: ['info', 'ships'],
            initialTab: 'info', 
            citizen: {
                info: {},
                home: {},
                ships: [],
                org: {},
                links: []
            },
            editing: false
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
                console.log(res.data.info)
                this.citizen.info = res.data.info
                this.citizen.home = res.data.home
                this.citizen.ships = res.data.ships
                this.citizen.links = []
                if(res.data.info.website){
                    this.citizen.links.push({text: "Website", url: res.data.info.website})
                }
                if(res.data.info.org) {
                    await this.getOrg()
                } else {
                    this.citizen.org = {}
                }
            }).catch((err) => {
                console.error(err)
            })

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

</style>