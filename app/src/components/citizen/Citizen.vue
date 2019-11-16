<template>
  <div class="citizen" id="citizen">
      <left-nav />
        <portal to="navigationPane">
            <div v-for="link in links" :key="link.text" class="nav-button"><router-link :to="link.path">{{ link.text }}</router-link></div>
        </portal>
      <citizen-main :citizen="citizen"/>
      <citizen-right :citizen="citizen"/>
  </div>
</template>

<script>
import LeftNav from '@/components/LeftNav.vue'
import CitizenMain from '@/components/citizen/CitizenMain.vue'
import CitizenRight from '@/components/citizen/CitizenRight.vue'

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
        LeftNav,
        CitizenMain,
        CitizenRight
    },
    methods: {
        async getCitizen() {
            try {
                const response = await fetch('https://api.uee.life/citizen/' + this.$route.params.handle, {
                    method: 'GET',
                    headers: { 'Accept': 'application/json; charset=UTF-8'}
                })
                const data = await response.json()
                this.citizen.info = data.info
                this.citizen.home = data.location
                this.citizen.ships = data.ships
                if(data.info.website){
                    this.citizen.links.push(data.info.website)
                }
                if(data.info.org) {
                    await this.getOrg()
                }
            } catch (error) {
                // eslint-disable-next-line
                console.error(error)
            }
            this.loading = false
        },
        async getOrg() {
            try {
                const response = await fetch('https://api.uee.life/organization/' + this.citizen.info.org, {
                    method: 'GET',
                    headers: { 'Accept': 'application/json; charset=UTF-8'}
                })
                const data = await response.json()
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
        $route(to, from, next) {
            if(this.$route.params.handle) {
                this.getCitizen()
            }
            next()
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