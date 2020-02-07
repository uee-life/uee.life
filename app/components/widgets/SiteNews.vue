<template>
  <main-panel title="Site News" mainClass="site-news" id="site-news" :style="newsHeight">
            <div class="title">
                <h3>UEE.life v0.2.1 Live</h3>
                <div class="date"><i>Updated: 7 Feb 2950</i></div>
            </div>
            <div>v0.2.1 Bug fix patch:
                <ul>
                    <li>Session management fix preventing infinite refresh loops</li>
                    <li>Layout and visual fixes</li>
                    <li>Updated libraries</li>
                </ul>
            <div>New features:
                <ul>
                    <li>Comletely re-written site using NUXT.js</li>
                    <li>Verified citizen now have a fancy verified badge on their portrait: <img style="width: 30px; margin-bottom: -10px;" src="~assets/verified.png" />
                    <li>Org member/affiliate lists now work! (With pagination for large orgs! *cough*TEST*cough*)</li>
                    <li>Pick your home! You visit your profile page once verified, click the "Edit Profile" option then choose your home! (Currently limited to the Stanton system)</li>
                    <li>New in-site authentication dialog!</li>
                    <li>Moons updated to Planet Tech v4 images! (thanks to /r/Ilunes for the photograhy!)</li>
                    <li>Many Visual and bug fixes!</li>
                    <li>Full mobile browser support!</li>
                    <li>Even! More! Exclamations!!!</li>
                </ul>
            </div>
            <div>
                Coming Soon:
                <ul>
                    <li>Fleet Management!</li>
                    <li>Event Calendar!</li>
                    <li>Org Management!</li>
                    <li>Enhanced location information!</li>
                </ul>
            </div>
            <p>Come back regularly to keep up with all updates.</p>
            <p>And don't forget to visit your settings page <nuxt-link to="/settings">here</nuxt-link> to verify your account!</p>
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
        flex-grow: 1;
    }

    .site-news .title {
        margin-top: 15px;
        margin-bottom: 20px;
    }

    .site-news .title h3 {
        margin: 0px;
        font-size: calc(14px + (18 - 14) * ((100vw - 300px) / (1600 - 300)));
        line-height: calc(1.3em + (1.5 - 1.2) * ((100vw - 300px)/(1600 - 300)));
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
        margin-left: 10px;
        margin-right: 10px;
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