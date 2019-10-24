<template>
  <div class="citizen" id="citizen">
      <left-nav />
      <citizen-main />
      <citizen-right />
  </div>
</template>

<script>
import LeftNav from '@/components/LeftNav.vue'
import CitizenMain from '@/components/citizen/CitizenMain.vue'
import CitizenRight from '@/components/citizen/CitizenRight.vue'

export default {
    name: "citizen",
    components: {
        LeftNav,
        CitizenMain,
        CitizenRight
    }
}
</script>

<style scoped>
    .citizen {
        width: 100%;
        display: flex;
    }
</style>