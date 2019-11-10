<template>
    <a :href="item.link" style="text-decoration: none" target="blank">
    <div ref="newsitem" class="news-item" id="news-item">
        <div class="background" :style="style"></div>
        <div class="mask"></div>
        <img class="article-image" :src="item.image" />
        <div class="news-item-info">
            <div><b>{{ item.title }}</b></div>
            <div>Posted: {{ item.posted }}</div>
        </div>
        <span class="corner top left"></span>
        <span class="corner top right"></span>
        <span class="corner bottom left"></span>
        <span class="corner bottom right"></span>
    </div></a>
</template>

<script>
//import {TimelineLite} from 'gsap'

export default {
    name: "news-item",
    props: ["item"],
    computed: {
        style () {
            return 'background: url(' + this.item.image + '); background-size: cover; background-position: center center;'
        }
    },
    mounted() {
        //const timeline = new TimelineLite()

        //timeline.to(".news-item", 1, {opacity: 0.9})
    }
}
</script>

<style>
    .article-image {
        width: 170px;
        margin-left: 1px;
        border: 2px solid black;
        z-index: 2;
    }

    .news-item {
        display: flex;
        width: 100% - 20px;
        min-width: 400px;
        margin: 5px 0 20px 15px;
        padding: 9px;
        border: 1px solid grey;
        position: relative;
        opacity: 1;
    }

    .news-item-info {
        margin-left: 10px;
        text-decoration: none;
        color: white;
        text-shadow: 2px 2px 4px #000;
    }

    .background {
        opacity: 0.9 !important;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        position: absolute;
        z-index: -1;
    }

    .mask {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: url('/images/fading-bars.png') repeat;
        z-index: 0;
    }
</style>