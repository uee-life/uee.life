<template>
    <dock-item class="discord" title="Discord">
          <div id="app-mount">
  </div>
  <script src="https://streamkit.discordapp.com/overlay/9276ab3f4f32e444dabc.js"></script>
  <script src="https://streamkit.discordapp.com/overlay/c455691e91268ba8d77c.js"></script>
    </dock-item>
</template>

<script>
import Gsap from 'gsap'

export default {
    name: 'discord',
    mounted() {
        Gsap.to('.discord', {delay: 0.5, duration: 1, opacity: 1})
    }
}
</script>

<style>
    .discord {
        opacity: 0;
        display: flex;
        justify-content: center;
    }
</style>