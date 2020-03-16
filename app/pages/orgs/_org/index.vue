<template>
    <div class="org-main" id="org-main">
        <portal to="leftDock">
            <dock-item title="nav">
            <div class="left-nav-button"><router-link to="/orgs">Search Orgs</router-link></div>
            <div class="left-nav-button"><a :href="spectrumLink">Spectrum</a></div>
            </dock-item>
        </portal>
        <org-banner :org="org" />
        <div class="org-tabs">
            <tabs :tabs="tabs" :initialTab="initialTab">
                <template slot="tab-title-info">
                    INFO
                </template>
                <template slot="tab-content-info">
                    <org-info :org="org" />
                </template>

                <template slot="tab-title-fleet">
                    FLEET
                </template>
                <template slot="tab-content-fleet">
                    <fleet-view :ships="fleet" view="small"/>
                </template>

                <template slot="tab-title-members">
                    MEMBERS
                </template>
                <template slot="tab-content-members">
                    <org-members />
                </template>

                <template slot="tab-title-affiliates">
                    AFFILIATES
                </template>
                <template slot="tab-content-affiliates">
                    <org-members :affiliate="true"/>
                </template>
            </tabs>
        </div>
    </div>
</template>

<script>
import { gsap } from 'gsap'

import OrgBanner from '@/components/org/OrgBanner.vue'
import OrgInfo from '@/components/org/OrgInfo.vue'
import FleetView from '@/components/fleet/FleetView.vue'
import OrgMembers from '@/components/org/OrgMembers.vue'

export default {
    layout: ({ isMobile }) => isMobile ? 'mobile' : 'default',
    name: "organization",
    components: {
        OrgBanner,
        OrgInfo,
        FleetView,
        OrgMembers
    },
    asyncData() {
        return {
            tabs: ["info", "fleet", "members", "affiliates"],
            initialTab: "info",
            org: {
                tag: ""
            },
            fleet: []
        }
    },
    computed: {
        spectrumLink() {
            return `https://robertsspaceindustries.com/spectrum/community/${this.org.tag}`
        }
    },
    methods: {
        async getOrg() {
            try {
                const sid = this.$route.params.org
                this.$axios.get(`https://api.uee.life/orgs/${sid}`).then((res) => {

                    if(res.status == 200) {
                        this.org = res.data
                    }
                    this.org.members = []
                }).catch(err => {
                    // eslint-disable-next-line
                    console.error(err)
                });
                
            } catch (error) {
                // eslint-disable-next-line
                console.error(error)
            }
        },
        async getOrgShips() {
            this.$axios({
                url: `https://api.uee.life/orgs/${this.$route.params.org}/ships`,
                method: "GET"
            }).then((res) => {
                this.fleet = res.data
            }).catch((err) => {
                this.$swal.fire('error', 'Error getting ships!', 'error')
            })
        }
    },
    mounted() {
        this.getOrg()
        this.getOrgShips()
    },
    watch: {
        route: {
            handler: function () {
                this.getOrg()
                this.getOrgShips()
            }
        },
        org: {
            handler: function () {
                gsap.to(".org-logo", {duration: 0.5, opacity: 1})
                gsap.to(".org-logo img", {duration: 0.5, opacity: 1})
                gsap.to(".org-banner h1", {duration: 0.5, opacity: 1})
            }
        }
    }
}
</script>

<style scoped>
    .organization {
        width: 100%;
        display: flex;
    }
</style>