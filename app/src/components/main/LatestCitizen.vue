<template>
  <div refs="org" class="latest-citizen" id="latest-citizen">
    <div class="content">
      <div class="cit-name">Latest Citizen</div>
      <img class="logo" :src="citizen.portrait" />
      <div class="cit-name">
        {{ citizen.name }}
      </div>
      <div class="cit-handle">
        Handle: {{ citizen.handle }}
      </div>
    </div>
    <span class="corner top left"></span>
    <span class="corner top right"></span>
    <span class="corner bottom left"></span>
    <span class="corner bottom right"></span>
  </div>
</template>

<script>
import { TimelineLite } from "gsap"

export default {
    name: "latest-citizen",
    data() {
        return {
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
    mounted() {
        const timeline = new TimelineLite()

        timeline.to(".latest-citizen .content", 1, {opacity: 1})
    }
}
</script>

<style>
  .latest-citizen {
    position: relative;
    padding: 15px;
    height: 330px;
    width: 100%;
    border: 1px solid grey;
    background: url('/images/fading-bars.png') repeat;
  }
  .content{
    display: flex;
    flex-direction: Column;
    justify-content: center;
    opacity: 0;
  }
  .logo {
    width: 165px;
    height: 165px; 
    align-self: center;
    margin: 10px;
  }
  .cit-name {
    align-self: center;
    font-size: 20px;
  }
  .cit-handle {
    align-self: center;
    margin-bottom: 15px;
  }
</style>