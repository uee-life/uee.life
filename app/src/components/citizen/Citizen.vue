<template>
  <div class="citizen" id="citizen">
      <left-dock />
        <portal to="navigationPane">
            <div v-for="link in links" :key="link.text" class="left-nav-button"><router-link :to="link.path">{{ link.text }}</router-link></div>
        </portal>
      <citizen-main :citizen="citizen"/>
      <right-dock />
  </div>
</template>

<script>
import axios from "axios"
import LeftDock from '@/components/layout/LeftDock.vue'
import RightDock from '@/components/layout/RightDock.vue'
import CitizenMain from '@/components/citizen/CitizenMain.vue'

export default {
    name: "citizen",
    data() {
        return {
            loading: true,
            links: [
                {
                text: "Home",
                path: "/"
                },
            ],
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
        LeftDock,
        RightDock,
        CitizenMain,
    },
    methods: {
        async getCitizen() {
            try {
                const { data } = await axios.get('https://api.uee.life/citizen/' + this.$route.params.handle)

                this.citizen.info = data.info
                this.citizen.home = data.location
                //this.citizen.ships = data.ships
                this.citizen.links = []
                if(data.info.website){
                    this.citizen.links.push(data.info.website)
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
        }
    },
    mounted() {
        this.getCitizen()
    },
    watch: {
        $route(to, from) {
            // eslint-disable-next-line
            console.log(from + "::" + to)
            if(this.$route.params.handle) {
                this.getCitizen()
            }
        }
    }
}
</script>

<style scoped>
    .citizen {
        width: 100%;
        display: flex;
    }
</style>