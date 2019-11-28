<template>
    <div class="news-article">
        <left-dock />
        <main-panel mainClass="article-main">
            <h3 class="title">{{title}}</h3>
            {{content}}
        </main-panel>
    </div>
</template>

<script>
export default {
    name: 'news-article',
    data() {
        return {
            title: "",
            content: ""
        }
    },
    methods: {
        loadArticle(id) {
            const data = {
                title: `This is an article (${id})`,
                content: 'this is a news article...'
            }
            this.title = data.title
            this.content = data.content
        }
    },
    mounted() {
        this.loadArticle(this.$route.params.newsId)
    }
}
</script>

<style>
    .news-article {
        display: flex;
        width: 100%;
    }

    .article-main {
        display: flex;
        width: 100%;
        padding: 10px;
        padding-top: 20px;
    }

    .article-main>.content {
        width: 100%;
    }

    .article-main>.contet>h3 {
        text-self: center;
    }
</style>
