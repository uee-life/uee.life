<template>
    <div id="citizen-info" class="citizen-info">
        <div class="portrait" id="portrait">
            <img class="portrait-img" :src="citizen.info.portrait" />
            <span v-if="citizen.info.verified" class="verified"><img src="~assets/star.png" /></span>
            <span class="corner top left"></span>
            <span class="corner top right"></span>
            <span class="corner bottom left"></span>
            <span class="corner bottom right"></span>
        </div>
        <div class="info">
            <div class="line-item"><div>UEE Record:</div><div>{{ citizen.info.record }}</div></div>
            <div class="line-item"><div>Name:</div><div>{{citizen.info.name}}</div></div>
            <div class="line-item"><div>Handle:</div><div>{{citizen.info.handle}}</div></div>
            <div class="line-item"><div>Enlisted:</div><div>{{citizen.info.enlisted}}</div></div>
            <br>
            <div>
                Home
            <ul>
                <li class="line-item">
                    <div>System:</div>
                    <div v-if="citizen.info.system"><router-link :to="systemLink">{{citizen.info.system}}</router-link></div>
                    <div v-else>Unknown</div>
                </li>
                <li class="line-item">
                    <div>Planet:</div>
                    <div v-if="citizen.info.planet"><router-link :to="planetLink">{{citizen.info.planet}}</router-link></div>
                    <div v-else>Unknown</div>
                </li>
                <li class="line-item">
                    <div>City:</div>
                    <div v-if="citizen.info.home"><router-link :to="homeLink">{{citizen.info.home}}</router-link></div>
                    <div v-else>Unknown</div>
                </li>
            </ul>
            </div>
        </div>
  </div>
</template>

<script>
import { gsap } from "gsap"

export default {
    name: "citizen-info",
    props: ["citizen"],
    data() {
        return {
        }
    },
    computed: {
        systemLink() {
            return `/system/${this.citizen.info.system}`
        },
        planetLink() {
            return `/planet/${this.citizen.info.planet}`
        },
        homeLink() {
            return `/poi/${this.citizen.info.home}`
        }
    },
    watch: {
        'citizen.info': {
            handler: function() {
                gsap.to(".portrait", {duration: 0.5, opacity: 1})
                gsap.to(".portrait", {duration: 0.5, width: "150px", height: "150px"})
                gsap.to(".portrait img", {duration: 0.5, delay: 1, opacity: 1})
                gsap.to(".portrait .verified", {duration: 0.5, delay: 1.5, opacity: 1})
                gsap.to(".citizen-info .info", {duration: 0.5, delay: 1.5, opacity: 1})
            }
        }
    }
}
</script>

<style scoped>
    .citizen-info {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        height: fit-content;
    }
    .portrait{
        box-sizing: border-box;
        width: 50px;
        height: 50px;
        padding: 7px;
        margin-bottom: 10px;
        background: url('/images/fading-bars.png') repeat;
        position: relative;
        opacity: 0;
    }

    .portrait img {
        width: 136px;
        height: 136px;
        opacity: 0;
    }

    .portrait .verified {
        opacity: 0;
    }

    .portrait .verified>img {
        opacity: 1;
    }

    .info {
        flex-basis: 250px;
        flex-grow: 1;
        max-width: 350px;
        margin-left: 20px;
        opacity: 0;
    }
    .line-item {
        display: flex;
        justify-content: space-between;
    }
</style>