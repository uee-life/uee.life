<template>
    <div class="front-page-main">
        <portal to="leftDock">
            <official-links />
            <community-links />
        </portal>
        <portal to="rightDock">
            <latest-citizen />
        </portal> 
        <main-panel title="Site News" mainClass="site-news" id="site-news" :style="newsHeight">
            <h3>UEE.life v0.1.1 now live!</h3>
            <p>In our first major update to UEE.life, you can now create an account, and link your RSI account!</p>
            <p>Once you have created your account (make sure you enter your RSI handle accurately), visit your profile page <router-link to="/profile">here</router-link> to verify your account!</p>
            <p>Come back regularly to keep up with all updates!
            </p>
            <p>This site is by the community, for the community, so if you have any thoughts on what
                you would like to see here, please let me know at: 
                <a href="mailto:capnflinttv@gmail.com">capnflinttv@gmail.com</a>
                </p>
                <div class="read-more" @click="toggleNews()">{{buttonText}}</div>
        </main-panel>
        <news-feed />
    </div>
</template>

<script>
import NewsFeed from "@/components/news/NewsFeed.vue"
import LatestCitizen from '@/components/main/LatestCitizen.vue'
import OfficialLinks from '@/components/main/OfficialLinks.vue'
import CommunityLinks from '@/components/main/CommunityLinks.vue'

export default {
    name: "front-page-main",
    components: {
        NewsFeed,
        LatestCitizen,
        OfficialLinks,
        CommunityLinks
    },
    data() {
        return {
            newsHeight: "height: 220px",
            buttonText: "Show More",
            showing: false
        }
    },
    methods: {
        toggleNews() {
            if(this.showing) {
                this.newsHeight = "height: 220px";
                this.buttonText = "Show More";
                this.showing = false;
            } else {
                this.newsHeight = "height: auto";
                this.buttonText = "Show Less";
                this.showing = true;
            }
        }
    }
}
</script>

<style>
    .front-page-main {
        position: relative;
        min-width: 500px;
        flex-basis: 500px;
        flex-grow: 1;
        padding: 10px;
        padding-top: 20px;
    }

    .site-news {
        display: flex;
        min-width: 300px;
        flex-grow: 1;
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