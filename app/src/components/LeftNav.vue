<template>
  <div id="left-nav" class="left-nav">
      Left Nav
    <span class="corner top left"></span>
    <span class="corner top right"></span>
    <span class="corner bottom left"></span>
    <span class="corner bottom right"></span>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
    .left-nav {
        width: 200px;
        min-width: 200px;
        height: 400px;
        border: 1px solid grey;
        margin: 10px;
        padding: 3px;
        position: relative;
        background: url('/images/fading-bars.png') repeat;
    }
</style>