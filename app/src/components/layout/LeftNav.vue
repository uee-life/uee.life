<template>
  <div id="left-nav" class="left-nav">
    <div class="section-title small">
            <span class="text">
                NAV
                <div class="endcap left"></div>
                <div class="endcap right"></div>
            </span>
        </div>
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

<style>
    .nav-button {
        margin-left: 10px;
        margin-right: 10px;
    }
    .nav-button a {
      text-decoration: none;
      color: #39ced8;
    }

    .left-nav {
        width: 220px;
        min-width: 220px;
        height: max-content;
        padding: 15px;
        position: relative;
        background: url('/images/fading-bars.png') repeat;
        margin-bottom: 20px;
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