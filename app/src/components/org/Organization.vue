<template>
    <div class="organization" id="organization">
        <left-dock />
        <org-main :org="org"/>
        <right-dock />
        <!--fleet-view :ships="ships" /-->
    </div>
</template>

<script>
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
    }
}
</script>

<style scoped>
    .organization {
        width: 100%;
        display: flex;
    }
</style>