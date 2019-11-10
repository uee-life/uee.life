<template>
  <div class="news-feed" id="news-feed">
      <div class="feed-title">News Feed:</div>
      <transition-group
        name="staggered-fade"
        tag="div"
        :css="false"
        v-on:before-enter="beforeEnter"
        v-on:enter="enter"
        v-on:leave="leave">
        <div v-for="(item, index) in articles" :key="item.title" :index="index">
            <news-item :item="item" />
        </div>
      </transition-group>
    </div>
</template>

<script>
import NewsItem from '@/components/news/NewsItem.vue'
import { TimelineLite } from 'gsap'

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
        },
        beforeEnter: function (el) {
            el.style.opacity = 0
        },
        enter: function (el) {
            var delay = el.getAttribute('index') * 250
            setTimeout(function() {
                new TimelineLite().to(el, 1, {opacity: 0.9})
            }, delay)
        },
        leave: function (el) {
            var delay = el.dataset.index * 150
            setTimeout(function() {
                new TimelineLite().to(el, 1, {opacity: 0})
            }, delay)
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