<template>
    <div class="wall-posts">
        <wall-post v-for="post in posts" :key='post.id' :data='post' />
    </div>
</template>

<script>
import WallPost from './wall/WallPost.vue'
export default {
    components: {
        WallPost
    },
    data() {
        return {
            title: 'News Feed',
            posts: [
                {
                    id: 2,
                    user: 'Flint McBane',
                    portrait: 'https://robertsspaceindustries.com/media/4v5c0bivhvd6qr/heap_infobox/FlintMcBane7.jpg',
                    date: '5 minutes ago',
                    content: 'This is a longer test post!'
                },
                {
                    id: 1,
                    user: 'Flint McBane',
                    portrait: 'https://robertsspaceindustries.com/media/4v5c0bivhvd6qr/heap_infobox/FlintMcBane7.jpg',
                    date: '1 hour ago',
                    content: 'This is a test post'
                }
            ]
        }
    }
}
</script>

<style>

</style>