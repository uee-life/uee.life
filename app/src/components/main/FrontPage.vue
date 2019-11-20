<template>
    <div class="front-page" id="front-page">
        <left-dock />
        <front-page-main />
        <right-dock />
    </div>
</template>

<script>
import FrontPageMain from '@/components/main/FrontPageMain.vue'

export default {
    name: "front-page",
    components: {
        FrontPageMain
    }
}
</script>

<style>
    .front-page {
        width: 100%;
        display: flex;
        flex-wrap: wrap
    }
</style>