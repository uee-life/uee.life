<template>
  <div class="news-feed" id="news-feed">
      <portal to="navigationPane">
            <div v-for="source in sources" v-on:click="search = source.search; title = source.name" :key="source.name" class="nav-button">
                <router-link to="/">{{ source.name }}</router-link>
            </div>
        </portal>
      <div class="feed-title">{{title}}:</div>
      <transition-group
        name="staggered-fade"
        tag="div"
        :css="false"
        v-on:before-enter="beforeEnter"
        v-on:enter="enter"
        v-on:leave="leave">
        <div v-for="(item, index) in articles" :key="index" :index="index">
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
            title: "All Articles",
            articles: [],
            pages: 1,
            loading: 0,
            more: true,
            search: {channel: "all", series: "all"},
            sources: [
                {
                    name: "All Articles",
                    search: {
                        channel: "all",
                        series: "all"
                    }
                },
                {
                    name: "Verse Watch",
                    search: {
                        channel: "spectrum-dispatch",
                        series: "news-update"
                    }
                },
                {
                    name: "Citizen Stories",
                    search: {
                        channel: "serialized-fiction",
                        series: "all"
                    }
                },
                {
                    name: "Historical Records",
                    search: {
                        channel: "spectrum-dispatch", 
                        series: "time-capsule"
                    }
                }
            ]
        }
    },
    components: {
        NewsItem
    },
    mounted() {
        this.scroll()
        this.getNews()
    },
    methods: {
        clearNews() {
            this.articles = []
            this.pages = 1
            this.more = true
        },
        async getNews() {
            this.loading = true
            try {
                const response = await fetch('https://www.capnflint.com:4443/rsi/news?channel=' + this.search.channel + '&series=' + this.search.series + '&page=' + this.pages, {
                    method: 'GET',
                    headers: { 'Accept': 'application/json; charset=UTF-8'}
                })
                const data = await response.json()
                if(data.length < 10) {
                    this.more = false
                }
                this.articles = this.articles.concat(data)
                this.pages += 1;
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error(error) 
            }
            this.loading = false
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
        leave: function(el) {
            new TimelineLite().to(el, 2, {opacity: 0})
        },
        scroll () {
            window.onscroll = () => {
                let bottomOfWindow = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight > document.documentElement.offsetHeight - 1000
                // eslint-disable-next-line
                console.log(this.more)                
                if (bottomOfWindow) {
                    if(!this.loading && this.more) {
                        this.getNews()
                    }
                }
            }
        }
    },
    watch: {
        search: function() {
            this.clearNews()
            this.getNews()
        }
    }

}
</script>

<style>
    .news-feed {
        display: flex;
        flex-basis: 500px;
        display: block;
    }

    .feed-title {
        font-size: 20px;
    }

    .nav-button {
        margin-left: 10px;
        margin-right: 10px;
    }
    .nav-button a {
      text-decoration: none;
      color: #39ced8;
    }
</style>