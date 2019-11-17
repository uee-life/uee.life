<template>
    <div class="front-page" id="front-page">
        <left-dock />
      <front-page-main />
      <front-page-right />
  </div>
</template>

<script>
import LeftDock from '@/components/layout/LeftDock.vue'
import FrontPageMain from '@/components/main/FrontPageMain.vue'
import FrontPageRight from '@/components/main/FrontPageRight.vue'

export default {
    name: "front-page",
    components: {
        FrontPageMain,
        FrontPageRight,
        LeftDock
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