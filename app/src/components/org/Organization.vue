<template>
    <div class="organization" id="organization">
        <left-dock />
        <portal to="navigationPane">
            <div class="left-nav-button"><router-link to="/orgs">Search Orgs</router-link></div>
            <div class="left-nav-button"><a :href="spectrumLink">Spectrum</a></div>
        </portal>
        <org-main :org="org" :fleet="ships" :members="members"/>
        <right-dock />
        <!--fleet-view :ships="ships" /-->
    </div>
</template>

<script>
import { TimelineLite } from "gsap"
import axios from "axios"

import LeftDock from '@/components/layout/LeftDock.vue'
import RightDock from '@/components/layout/RightDock.vue'
import OrgMain from "@/components/org/OrgMain.vue"

export default {
    name: "organization",
    components: {
        LeftDock,
        RightDock,
        OrgMain
    },
    data() {
        return {
            org: {
                tag: ""
            },
            members: [],
            ships: [
                    {
                    id: 1,
                    manufacturer: "Anvil",
                    make: "Hornet",
                    model: "F7a",
                    name: "Bulldog",
                    size: "Light",
                    crew: 8
                },
                {
                    id: 2,
                    manufacturer: "Aegis",
                    make: "Avenger",
                    model: "Titan",
                    name: "Penguin",
                },
                {
                    id: 3,
                    manufacturer: "RSI",
                    make: "Constellation",
                    model: "Phoenix",
                    name: "Shark",
                }
                ]
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
                axios.get(`https://api.uee.life/organization/${sid}`).then(res => {

                    if(res.status == 200) {
                        this.org = res.data
                    }
                })
                axios.get(`http://api.sc-tools.org/v1/orgs/${sid}/json`).then(res => {
                                        // eslint-disable-next-line
                    console.log(res.status)
                    if(res.data.status === 'ok') {
                                            // eslint-disable-next-line
                    console.log(res.data.orgs.members)
                        this.members = res.data.orgs.members
                    } else {
                        this.members = []
                    }
                })
                
            } catch (error) {
                // eslint-disable-next-line
                console.error(error)
            }
        }
    },
    mounted() {
        this.getOrg()
    },
    watch: {
        route: {
            handler: function () {
                this.getOrg();
            }
        },
        org: {
            handler: function () {
                const timeline = new TimelineLite()
                timeline.to(".org-logo", 0.5, {opacity: 1})
                timeline.to(".org-logo img", 0.5, {opacity: 1})
                timeline.to(".org-banner h1", 0.5, {opacity: 1})
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