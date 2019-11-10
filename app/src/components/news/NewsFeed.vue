<template>
  <div class="news-feed" id="news-feed">
      <div class="feed-title">News Feed:</div>
    <div v-for="item in articles" :key="item.title">
      <news-item :item="item" />
      </div>
    </div>
</template>

<script>
import NewsItem from '@/components/news/NewsItem.vue'

export default {
    name: "news-feed",
    data() {
        return {
            articles: []
        }
    },
    components: {
        NewsItem
    },
    mounted() {
        this.getNews()
    },
    methods: {
        async getNews() {
            try {
                const response = await fetch('https://www.capnflint.com:4443/rsi/news', {
                    method: 'GET',
                    headers: { 'Accept': 'application/json; charset=UTF-8'}
                })
                const data = await response.json()
                this.articles = data
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error(error) 
            }
        }
    }

}
</script>

<style>
    .news-feed {
        display: flex;
        width: 100%;
        display: block;
    }

    .feed-title {
        font-size: 20px;
    }
</style>