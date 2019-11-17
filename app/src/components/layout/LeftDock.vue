<template>
  <div id="left-dock" class="left-dock">
    <div id="left-nav" class="left-nav">
      <portal-target name="navigationPane"></portal-target>
      <span class="corner top left"></span>
      <span class="corner top right"></span>
      <span class="corner bottom left"></span>
      <span class="corner bottom right"></span>
    </div>
    <portal-target name="leftDock"></portal-target>
  </div>
</template>

<script>
export default {
  name: 'left-dock'
}
</script>

<style>
    .left-dock {
        width: fit-content;
        max-width: 240px;
        height: 100%;
        margin: 0px;
        padding: 10px;
        position: relative;
    }

    .left-nav {
        width: 220px;
        min-width: 220px;
        height: max-content;
        border: 1px solid grey;
        padding: 15px;
        position: relative;
        background: url('/images/fading-bars.png') repeat;
    }

    .nav-title::before {
      content: "[ "
    }
    .nav-title::after {
      content: " ]"
    }
    .left-nav-button::before {
      content: "> "
    }
    .left-nav-button {
        margin-left: 10px;
        margin-right: 10px;
    }
    .left-nav-button a {
      text-decoration: none;
      color: #39ced8;
    }
</style>