<template>
    <div class="front-page" id="front-page">
      <front-page-main />
      <front-page-right />
  </div>
</template>

<script>
import FrontPageMain from '@/components/main/FrontPageMain.vue'
import FrontPageRight from '@/components/main/FrontPageRight.vue'

export default {
    name: "front-page",
    components: {
        FrontPageMain,
        FrontPageRight
    }
}
</script>

<style>
    .front-page {
        width: 100%;
        display: flex;
    }
</style>