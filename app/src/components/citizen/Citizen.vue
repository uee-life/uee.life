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
            links: [
                {
                text: "Home",
                path: "/"
                },
            ],
            citizen: {
                name: "Flint McBane",
                handle: "Capn_Flint",
                bio: "This is a bio...",
                record: "84348",
                enlisted: "Nov 18, 2194",
                portrait: "https://robertsspaceindustries.com/media/lb0drmasxlhcyr/heap_infobox/Grog_fallout.png",
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
                    name: "McBane Enterprises",
                    type: "Organization",
                    title: "Director",
                    logo: "https://robertsspaceindustries.com/media/2weountodg09pr/heap_infobox/MCBANE-Logo.png"
                }

            }
        }
    },
    components: {
        LeftNav,
        CitizenMain,
        CitizenRight
    }
}
</script>

<style scoped>
    .citizen {
        width: 100%;
        display: flex;
    }
</style>