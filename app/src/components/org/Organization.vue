<template>
    <div class="organization" id="organization">
        <left-dock />
        <portal to="navigationPane">
            <div class="left-nav-button"><router-link to="/orgs">Search Orgs</router-link></div>
            <div class="left-nav-button"><a :href="spectrumLink">Spectrum</a></div>
        </portal>
        <org-main :org="org" :fleet="ships" />
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
                axios.get(`http://localhost:3001/organization/${sid}`).then((res) => {

                    if(res.status == 200) {
                        this.org = res.data
                    }
                    this.org.members = []
                    this.getOrgMembers()
                }).catch(err => {
                    // eslint-disable-next-line
                    console.error(err)
                });
                
            } catch (error) {
                // eslint-disable-next-line
                console.error(error)
            }
        },
        async getOrgMembers() {
            const sid = this.$route.params.org
            axios.get(`http://localhost:3001/organization/${sid}/members/1`).then((res) => {
                if(res.status == 200) {
                    this.$nextTick(() => {
                        //eslint-disable-next-line
                        console.log(this.org.members)
                        this.org.members.concat(res.data.members)
                        this.org.memberCount = res.data.count
                    })
                }
            })
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