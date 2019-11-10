<template>
    <div class="front-page" id="front-page">
        <left-nav />
      <front-page-main />
      <front-page-right />
  </div>
</template>

<script>
import LeftNav from '@/components/LeftNav.vue'
import FrontPageMain from '@/components/main/FrontPageMain.vue'
import FrontPageRight from '@/components/main/FrontPageRight.vue'

export default {
    name: "front-page",
    components: {
        FrontPageMain,
        FrontPageRight,
        LeftNav
    }
}
</script>

<style>
    .front-page {
        width: 100%;
        display: flex;
    }
</style>