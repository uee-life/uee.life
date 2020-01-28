<template>
    <div class="org-main" id="org-main">
        <div v-html="$md.render(markdown)"></div>
        <fleet-view :ships="ships"/>
    </div>
</template>

<script>
import axios from "axios"
import { gsap } from 'gsap'

import FleetView from '@/components/fleet/FleetView.vue'

export default {
    layout: ({ isMobile }) => isMobile ? 'mobile' : 'default',
    name: "ships",
    components: {
        FleetView
    },
    data() {
        return {
            ships: [],
            search: '',
            markdown: "Page Under Construction. Please check back soon!\ntest\n\n" +
                "## H2\n\n" +
                "### H3\n\n" + 
                "A paragraph with **bold** and ~~strike~~ plus a [link](http://uee.life)\n\n" +
                "* bullet\n" +
                "* bullet 2\n\n" + 
                "1. number\n" +
                "1. another number\n\n" +
                "> a multiline\n" +
                "> quote with **strength**\n\n" +
                "`let foo = \"code\"`\n"
        }
    },
    methods: {
        getShips() {
            axios({
                url: 'https://api.uee.life/ships',
                method: 'GET'
            }).then((res) => {
                this.ships = res.data.ships
            }).catch((err) => {
                console.error(err)
            })
        }
    },
    mounted() {
        this.getShips()
    }
}
</script>

<style scoped>

</style>