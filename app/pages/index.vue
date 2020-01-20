<template>
    <div class="content">
      <portal to="leftDock">    
        <site-news v-if="isMobile"/>
        <official-links v-if="!isMobile" />
        <community-links v-if="!isMobile" />
        <left-nav />
      </portal>
      <portal to="rightDock">
        <site-stats :stats="stats" />
        <latest-citizen :citizen="citizen" />
      </portal>
      <site-news v-if="!isMobile" style="margin-bottom: 30px"/>
      <news-feed />
    </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import { gsap } from 'gsap'

import NewsFeed from '@/components/news/NewsFeed'
import OfficialLinks from '@/components/widgets/OfficialLinks'
import CommunityLinks from '@/components/widgets/CommunityLinks'
import SiteStats from '@/components/widgets/SiteStats'
import LatestCitizen from '@/components/widgets/LatestCitizen'
import SiteNews from '@/components/widgets/SiteNews'

export default {
    layout: ({ isMobile }) => isMobile ? 'mobile' : 'default',
    components: {
        NewsFeed,
        OfficialLinks,
        CommunityLinks,
        SiteStats,
        LatestCitizen,
        SiteNews
    },
    computed: {
        ...mapGetters([
            'isAuthenticated',
            'loggedUser'
        ])
    },
    asyncData() {
        return {
            stats: null,
            citizen: null
        }
    },
    methods: {
        async getStats() {
            axios({
            url: 'https://api.uee.life/stats',
            method: 'GET'
            }).then((res) => {
            this.stats = res.data
            this.getCitizen(this.stats.latestCitizen)
            })
        },
        async getCitizen(handle) {
            axios({
            url: `https://api.uee.life/citizen/${handle}/info`,
            method: 'GET'
            }).then((res) => {
            this.citizen = res.data
            }).catch((error) => {
            // eslint-disable-next-line
            console.error(error)
            });
        }
    },
    mounted() {
        this.getStats()
    }
}
</script>

<style>

</style>
