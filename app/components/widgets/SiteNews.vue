<template>
  <main-panel title="Site News" mainClass="site-news" id="site-news" :style="newsHeight">
            <div class="title">
                <h3>UEE.life v0.1.2 now live!</h3>
                <div class="date"><i>Updated: 12 Dec 2949</i></div>
            </div>
            <div>Now featuring:
                <ul>
                    <li>System Information! (Check it out: <nuxt-link to="/system/stanton">Stanton System</nuxt-link>)</li>
                    <li>Site Stats!</li>
                    <li>Updated Official and Community Links!</li>
                    <li>Verified Citizen persistance! (prereq for location/fleet management)</li>
                    <li>Visual Upgrade!</li>
                </ul>
            </div>
            <div>
                Coming Soon:
                <ul>
                    <li>Set your home location!</li>
                    <li>Add ships to your fleet!</li>
                    <li>Enhanced location information!</li>
                    <li>Mobile Browser Support! (I know, I know!!!)</li>
                </ul>
            </div>
            <p>Come back regularly to keep up with all updates.</p>
            <p>And don't forget to visit your profile page <nuxt-link to="/profile">here</nuxt-link> to verify your account!</p>
            <p>This site is by the community, for the community, so if you have any thoughts on what
                you would like to see here, please let me know at: 
                <a href="mailto:capnflinttv@gmail.com">capnflinttv@gmail.com</a>
            </p>
            <div class="read-more" @click="toggleNews()">{{buttonText}}</div>
        </main-panel>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import { gsap } from 'gsap'
export default {
    data() {
        return {
            newsHeight: "height: 100px",
            buttonText: "Read More",
            showing: false,
        }
    },
    methods: {
        toggleNews() {
            if(this.showing) {
                gsap.to(".site-news", 0.5, {height: '100px'})
                //this.newsHeight = "height: 100px";
                this.buttonText = "Read More";
                this.showing = false;
            } else {
                gsap.fromTo(".site-news", 0.5, {height: '100px'}, {height: 'auto'})
                this.buttonText = "Hide";
                this.showing = true;
            }
        },
    },

}
</script>

<style>
    .site-news {
        display: flex;
        box-sizing: border-box;
        min-width: 300px;
        flex-grow: 1;
    }

    .site-news .title {
        margin-top: 15px;
        margin-bottom: 20px;
    }

    .site-news .title h3 {
        margin: 0px;
    }

    .site-news .title .date {
        font-size: 12px;
    }

    .site-news>.content {
        display: flex;
        flex-direction: column;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-left: 10%;
        margin-right: 10%;
    }

    .site-news>.content>h3 {
        word-spacing: 8px;
    }

    .site-news>.content>.read-more {
        position: absolute;
        bottom: 10px;
        right: 20px;
    }

    .site-news>.content>.read-more:hover {
        color: #dbf3ff;
        cursor: pointer;
    }
</style>