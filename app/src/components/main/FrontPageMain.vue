<template>
    <div class="front-page-main">
        <portal to="leftDock">
            <community-links />
        </portal>
        <portal to="rightDock">
            <latest-citizen />
        </portal> 
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
    }
</style>