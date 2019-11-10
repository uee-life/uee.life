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
        width: 100%;
        padding: 10px;
    }
</style>