<template>
    <div class="organization" id="organization">
        <left-dock />
        <portal to="navigationPane">
            <div class="left-nav-button"><router-link to="/organization">Search Orgs</router-link></div>
            <div class="left-nav-button"><a :href="spectrumLink">Spectrum</a></div>
        </portal>
        <org-main :org="org" :fleet="ships"/>
        <right-dock />
        <!--fleet-view :ships="ships" /-->
    </div>
</template>

<script>
import { TimelineLite } from "gsap"

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
            links: [
                {
                text: "Search Orgs",
                path: "/organization"
                },
                {
                    text: "Spectrum",
                    path: "https://robertsspaceindustries.com/spectrum/community/"
                }
            ],
            org: {
                name: "Testy Mc Test Face"
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
                const response = await fetch('https://api.uee.life/organization/' + this.$route.params.org, {
                    method: 'GET',
                    headers: { 'Accept': 'application/json; charset=UTF-8'}
                })
                const data = await response.json()
                this.org = data
            } catch (error) {
                // eslint-disable-next-line
                console.error(error)
            }
            this.loading = false
        }
    },
    mounted() {
        this.getOrg()
    },
    watch: {
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