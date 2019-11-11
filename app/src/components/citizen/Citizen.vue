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
                home: {
                    system: "Stanton",
                    planet: "Hurston",
                    city: "Lorville"
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
                ],
                org: {
                  /*  name: "McBane Enterprises",
                    type: "Organization",
                    title: "Director",
                    logo: "https://robertsspaceindustries.com/media/2weountodg09pr/heap_infobox/MCBANE-Logo.png"
               */ }

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
                const response = await fetch('https://www.capnflint.com:4443/rsi/citizen?q=' + this.$route.params.handle, {
                    method: 'GET',
                    headers: { 'Accept': 'application/json; charset=UTF-8'}
                })
                const data = await response.json()
                this.citizen.info = data
                this.getOrg()
            } catch (error) {
                // eslint-disable-next-line
                console.error(error)
            }
            this.loading = false
        },
        async getOrg() {
            try {
                const response = await fetch('https://www.capnflint.com:4443/rsi/org?q=' + this.citizen.info.org, {
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
        },
    },
    mounted() {
        this.getCitizen()
    },
    watch: {
        $route(to, from, next) {
            this.getCitizen()
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