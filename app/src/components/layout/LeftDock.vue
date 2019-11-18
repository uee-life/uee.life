<template>
  <div id="left-dock" class="left-dock">
    <left-nav />
    <portal-target name="leftDock"></portal-target>
  </div>
</template>

<script>
import LeftNav from '@/components/layout/LeftNav.vue'
export default {
  name: 'left-dock',
  components: {
    LeftNav
  }
}
</script>

<style>
    .left-dock {
        width: fit-content;
        max-width: 240px;
        height: 100%;
        margin: 0px;
        padding: 10px;
        padding-top: 20px;
        position: relative;
    }
</style>