<template>
  <div id="left-nav" class="left-nav">
    <portal-target name="navigationPane"></portal-target>
    <span class="corner top left"></span>
    <span class="corner top right"></span>
    <span class="corner bottom left"></span>
    <span class="corner bottom right"></span>
  </div>
</template>

<script>
export default {
  name: "left-nav",
  //props: ["links"],
}
</script>

<style scoped>
    .left-nav {
        width: 200px;
        min-width: 200px;
        height: 400px;
        border: 1px solid grey;
        margin: 10px;
        padding: 15px;
        position: relative;
        background: url('/images/fading-bars.png') repeat;
    }
    .nav-button {
        margin-left: 10px;
        margin-right: 10px;
    }
    .nav-button a {
      text-decoration: none;
      color: #39ced8;
    }
</style>