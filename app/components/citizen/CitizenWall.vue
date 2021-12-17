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
                    date: new Date(2021, 11, 10),
                    content: 'This is a longer test post!',
                    likes: 5,
                    visibility: 'private'
                },
                {
                    id: 1,
                    user: 'Flint McBane',
                    portrait: 'https://robertsspaceindustries.com/media/4v5c0bivhvd6qr/heap_infobox/FlintMcBane7.jpg',
                    date: new Date(2021,10,30),
                    content: 'This is a test post',
                    likes: 21,
                    visibility: 'private'
                }
            ]
        }
    }
}
</script>

<style>

</style>