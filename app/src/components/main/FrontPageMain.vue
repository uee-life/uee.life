<template>
    <div class="front-page-main">
      <news-feed />
    </div>
</template>

<script>
import NewsFeed from "@/components/news/NewsFeed.vue"

export default {
    name: "front-page-main",
    components: {
        NewsFeed
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