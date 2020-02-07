<template>
    <div ref="newsitem" class="news-item" id="news-item">
        <a :href="item.link" style="text-decoration: none" target="blank">
            <div class="content">
            <div class="background" :style="style"></div>
            <div class="mask"></div>
            <div class="article-image">
                <img :src="item.image" />
            </div>
            <div class="news-item-info">
                <div><b>{{ item.title }}</b></div>
                <div>Posted: {{ item.posted }}</div>
            </div>
            </div>
            <span class="corner top left"></span>
            <span class="corner top right"></span>
            <span class="corner bottom left"></span>
            <span class="corner bottom right"></span>
        </a>
    </div>
</template>

<script>

export default {
    name: "news-item",
    props: ["item"],
    computed: {
        style () {
            return 'background: url("' + this.item.image + '"); background-size: cover; background-position: center center;'
        }
    }
}
</script>

<style>
    .article-image {
        max-width: 170px;
        flex-basis: 90%;
        flex-grow: 1;
        z-index: 2;
    }

    .article-image>img {
        width: 100%;
        border: 2px solid black;
    }

    .news-item {
        display: flex;
        margin: 10px;
        padding: 9px;
        position: relative;
        opacity: 1;
        flex-grow: 1;
    }

    .news-item .content {
        display: flex;
        flex-grow: 1;
    }

    .news-item-info {
        margin-left: 10px;
        text-decoration: none;
        color: #dbf3ff;
        text-shadow: 2px 2px 4px #000;
    }

    .news-item .background {
        opacity: 0.5 !important;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        position: absolute;
        z-index: -1;
    }

    .news-item .mask {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: url('/images/fading-bars.png') repeat;
        z-index: 0;
    }
</style>