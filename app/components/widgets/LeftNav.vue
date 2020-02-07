<template>
  <dock-item title="nav" mainClass="left-nav">
    <portal-target name="navigationPane"></portal-target>
  </dock-item>
</template>

<script>
import { gsap } from 'gsap'

export default {
  name: "left-nav",
  //props: ["links"],,
  mounted() {
    gsap.to('.left-nav', {duration: 0.5, opacity: 1})
  }
}
</script>

<style>
    .left-nav .content {
      opacity: 1;
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