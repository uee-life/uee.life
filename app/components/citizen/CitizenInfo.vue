<template>
    <div id="citizen-info" :class="componentClass">
        <div class="citizen-portrait" id="portrait">
            <portrait :citizen="citizen.info" />
            <!--img class="portrait-img" :src="citizen.info.portrait" />
            <span class="verified"><img v-if="citizen.info.verified" src="~assets/verified.png" /></span-->
            <span class="corner top left"></span>
            <span class="corner top right"></span>
            <span class="corner bottom left"></span>
            <span class="corner bottom right"></span>
        </div>
        <div class="info">
            <div class="citizen-data">
                <div class="labels">
                    <span>UEE Record: </span>
                    <span>Name: </span>
                    <span>Handle: </span>
                    <span>Enlisted: </span>
                </div>
                <div class="data">
                    <span>{{ citizen.info.record }}</span>
                    <span>{{ citizen.info.name }}</span>
                    <span>{{ citizen.info.handle }}</span>
                    <span>{{ citizen.info.enlisted }}</span>
                </div>
            </div>
            <br>
        <citizen-location :home="citizen.home" :editing="editing"/>
        </div>
  </div>
</template>

<script>
import { gsap } from "gsap"

import CitizenLocation from '@/components/citizen/CitizenLocation'

export default {
    name: "citizen-info",
    props: ["citizen", "editing"],
    components: {
        CitizenLocation
    },
    data() {
        return {
        }
    },
    computed: {
        componentClass() {
            if(this.isMobile) {
                return "citizen-info mobile"
            } else {
                return "citizen-info"
            }
        }
    },
    watch: {
        'citizen.info': {
            handler: function() {
                let size = ""
                if(this.isMobile) {
                    size = "200px"
                } else {
                    size = "180px"
                }
                gsap.to(".citizen-portrait", {duration: 0.5, opacity: 1})
                gsap.to(".citizen-portrait", {duration: 0.5, width: size, height: size})
                gsap.to(".citizen-portrait div", {duration: 0.5, delay: 1, opacity: 1})
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

    .citizen-info.mobile {
        justify-content: center;
    }

    .citizen-portrait{
        display: flex;
        box-sizing: border-box;
        width: 50px;
        height: 50px;
        padding: 7px;
        margin: 0;
        margin-bottom: 10px;
        background: url('/images/fading-bars.png') repeat;
        position: relative;
        opacity: 0;
        align-self: auto;
        align-items: center;
        justify-content: center;
    }

    .citizen-portrait .portrait {
        opacity: 0;
    }

    .citizen-portrait img {
        width: 100%;
        height: 100%;
        opacity: 0;
    }

    .citizen-portrait .verified {
        position: absolute;
        bottom: 0;
        right: 8px;
        width: 35px;
        opacity: 0;
    }

    .citizen-portrait .verified>img {
        opacity: 1;
        width: 100%;
        height: auto;
    }

    .info {
        display: flex;
        flex-direction: column;
        flex-basis: 250px;
        flex-grow: 1;
        max-width: 350px;
        margin-left: 20px;
        opacity: 0;
    }

    .citizen-data {
        display: flex;
    }

    .citizen-data .labels {
        display: flex;
        flex-direction: column;
        font-family: 'Michroma';
        font-size: 12px;
        text-transform: uppercase;
    }
    .citizen-data .data {
        display: flex;
        flex-direction: column;
        font-size: 14px;
        line-height: 19.5px;
        margin-left: 10px;
        color: #dbf3ff;
    }
</style>