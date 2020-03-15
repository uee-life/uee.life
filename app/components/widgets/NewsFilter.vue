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

<style>
    .news-filter {
      opacity: 0;
    }

    .left-nav-button::before {
      content: "> "
    }
    .left-nav-button {
        margin-left: 10px;
        margin-right: 0px;
        margin-bottom: 3px;
        overflow:hidden;
    }
    .left-nav-button a {
      text-decoration: none;
      color: #39ced8;
    }

    .left-nav-button a:hover {
      color: #dbf3ff;
    }
</style>