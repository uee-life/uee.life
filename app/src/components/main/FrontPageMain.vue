<template>
    <div class="front-page-main">
        <portal to="leftDock">
            <community-links />
        </portal>
        <portal to="rightDock">
            <latest-citizen />
        </portal> 
        <main-panel title="Site News" mainClass="site-news" id="site-news" :style="newsHeight">
            <h3>Welcome to UEE.life!</h3>
            <p>Welcome to the grand launch of UEE.life! The portal to your life in the UEE!</p>
            <p>As the initial release, we currently lack many of the features we have planned, 
                but worry not! We will continue working on UEE.life to make sure it is always
                your primary destination!</p>
            <p>Planned Features:
                <ul>
                    <li>Profile Customization</li>
                    <li>Fleet Management</li>
                    <li>Org Management</li>
                    <li>Location Database</li>
                    <li>Community Event Calendar</li>
                </ul>
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
import CommunityLinks from '@/components/main/CommunityLinks.vue'

export default {
    name: "front-page-main",
    components: {
        NewsFeed,
        LatestCitizen,
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
        align-self: center;
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