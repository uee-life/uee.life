<template>
  <dock-item title="News Source" class="news-filter">
    <portal-target name="news-filter"></portal-target>
  </dock-item>
</template>

<script>
import { gsap } from 'gsap'

export default {
  name: "news-filter",
  mounted() {
    gsap.to('.news-filter', {duration: 0.5, opacity: 1})
  }
}
</script>

<style scoped>
    .news-filter {
      opacity: 0;
    }
</style>