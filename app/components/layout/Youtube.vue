<template>
    <main-panel class="youtube" :title="title">
        <div class="description">
            <slot></slot>
        </div>
        <div class="video">
            <iframe width="560" height="315" :src="videoLink" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
    </main-panel>
</template>

<script>
export default {
    name: 'video',
    props: ['title', 'vid'],
    computed: {
        videoLink() {
            return `https://www.youtube-nocookie.com/embed/${this.vid}`
        }
    }
}
</script>

<style>
.youtube {
    position: relative;
    display: flex;
    flex-direction: column;
    flex-basis: 560px;
}

.youtube .video {
    display: flex;
    justify-content: center;
}
</style>