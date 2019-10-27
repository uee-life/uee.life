<template>
  <div id="citizen-info" class="citizen-info">
      <div class="portrait" id="portrait">
          <img class="portrait-img" :src="citizen.portrait" />
            <span class="corner top left"></span>
          <span class="corner top right"></span>
          <span class="corner bottom left"></span>
          <span class="corner bottom right"></span>
      </div>
      <div class="info">
          <div class="line-item"><div>UEE Citizen Record:</div><div>#{{ citizen.record }}</div></div>
          <div class="line-item"><div>Name:</div><div>{{citizen.name}}</div></div>
          <div class="line-item"><div>Handle:</div><div>{{citizen.handle}}</div></div>
          <div class="line-item"><div>Enlisted:</div><div>{{citizen.enlisted}}</div></div>
          <br>
          <div>
            Home:
          <ul>
              <li class="line-item"><div>System</div>-<div>{{citizen.home.system}}</div></li>
              <li class="line-item"><div>Planet</div>-<div>{{citizen.home.planet}}</div></li>
              <li class="line-item"><div>City:</div>-<div>{{citizen.home.city}}</div></li>
          </ul>
          </div>
      </div>
  </div>
</template>

<script>
import { TimelineLite } from "gsap"

export default {
    name: "citizen-info",
    props: ["citizen"],
    data() {
        return {
            user: {
                portrait: "https://robertsspaceindustries.com/media/lb0drmasxlhcyr/heap_infobox/Grog_fallout.png",
            }
        }
    },
    mounted() {
        const timeline = new TimelineLite()

        timeline.to(".portrait", 1, {width: "150px", height: "150px"})
        timeline.to(".portrait img", 1, {opacity: 1})
        timeline.to(".citizen-info .info", 1, {opacity: 1})
    }
}
</script>

<style>
    .citizen-info {
        display: flex;
        width: 100%;
        height: 250px;
    }
    .portrait{
        width: 50px;
        height: 50px;
        border: 1px solid grey;
        padding: 7px;
        margin-right: 20px;
        background: url('/images/fading-bars.png') repeat;
        position: relative;
    }

    .portrait img {
        width: 136px;
        height: 136px;
        opacity: 0;
    }
    .info {
        width: 220px;
        opacity: 0;
    }
    .line-item {
        display: flex;
        justify-content: space-between;
    }
</style>