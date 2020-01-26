<template>
  <dock-item class="made-by">
      <img class="made-by-img" src="~assets/community.png" />
  </dock-item>
</template>

<script>
import Gsap from 'gsap'

export default {
    name: 'made-by',
    mounted() {
        Gsap.to('.made-by', {delay: 0.5, duration: 1, opacity: 1})
    }
}
</script>

<style>
    .made-by {
        opacity: 0;
        display: flex;
        justify-content: center;
    }
    .made-by-img {
        width: 220px;
    }
</style>