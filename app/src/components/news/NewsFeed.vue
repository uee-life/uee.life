<template>
    <div class="news-feed" id="news-feed">
        <portal to="navigationPane">
            <div class="nav-title">Filter View</div>
            <div v-for="source in sources" v-on:click="search = source.search; title = source.name" :key="source.id" class="left-nav-button">
                <router-link to="/">{{ source.name }}</router-link>
            </div>
        </portal>
        <section-title :text="title" size="big"/>
        <transition-group
            name="staggered-fade"
            tag="div"
            :css="false"
            v-on:before-enter="beforeEnter"
            v-on:enter="enter"
            v-on:leave="leave">
            <div v-for="(item, index) in articles" :key="item.id" :index="index">
                <news-item :item="item" />
            </div>
        </transition-group>
        <div class="more" v-if="more" @click="loadMore()">
            Load More
            <div class="endcap left"></div>
            <div class="endcap right"></div>
        </div>
    </div>
</template>

<script>
import axios from "axios"

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
                // Get the access token from the auth wrapper
                //const token = await this.$auth.getTokenSilently();

                // Use Axios to make a call to the API
                const { data } = await axios.get('https://api.uee.life/news?channel=' + this.search.channel + '&series=' + this.search.series + '&page=' + this.pages, {
                    headers: {
                        //Authorization: `Bearer ${token}`    // send the access token through the 'Authorization' header
                    }
                });

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
        loadMore: function() {
            if(!this.loading && this.more) {
                this.getNews()
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
        position: relative;
        display: flex;
        flex-basis: 500px;
        display: block;
        padding-top: 20px;
        margin-top: 20px;
    }

    .news-feed .more {
        position: relative;
        width: 100% - 20px;
        display: flex;
        justify-content: center;
        font-size: 21px;
        cursor: pointer;
        margin: 5px 0 20px 0;
        background: url('/images/fading-bars.png') repeat;
    }

    .news-feed .more:hover {
        color: #dbf3ff;
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