<template>
    <div class="content">
        <portal to="leftDock">    
            <site-news v-if="isMobile"/>
            <news-filter v-if="!isMobile"/>
            <official-links v-if="!isMobile" />
            <community-links v-if="!isMobile" />
            <news-filter v-if="isMobile"/>
        </portal>
        <portal to="rightDock">
            <giveaway />
            <official-links v-if="isMobile" />
            <community-links v-if="isMobile" />
            <site-stats :stats="stats" />
            <latest-citizen v-if="stats" :handle="stats.latestCitizen" />
        </portal>
        <site-news v-if="!isMobile" style="margin-bottom: 30px"/>
        <news-feed />
    </div>
</template>

<script>
import { gsap } from 'gsap'

import NewsFeed from '@/components/news/NewsFeed'
import OfficialLinks from '@/components/widgets/OfficialLinks'
import CommunityLinks from '@/components/widgets/CommunityLinks'
import NewsFilter from '@/components/widgets/NewsFilter'
import SiteStats from '@/components/widgets/SiteStats'
import LatestCitizen from '@/components/widgets/LatestCitizen'
import SiteNews from '@/components/content/SiteNews'
import Giveaway from '@/components/widgets/Giveaway'

export default {
    layout: ({ isMobile }) => isMobile ? 'mobile' : 'default',
    components: {
        NewsFeed,
        OfficialLinks,
        CommunityLinks,
        NewsFilter,
        SiteStats,
        LatestCitizen,
        SiteNews,
        Giveaway
    },
    asyncData() {
        return {
            stats: null,
            citizen: null
        }
    },
    methods: {
        async getStats() {
            this.$axios({
                url: 'https://api.uee.life/stats',
                method: 'GET'
            }).then((res) => {
                this.stats = res.data
            //this.getCitizen(this.stats.latestCitizen)
            }).catch((err) => {
                console.error(err)
            })
        }
    },
    mounted() {
        this.getStats()
    }
}
</script>

<style>

</style>
