<template>
  <div id="left-nav" class="left-nav">
    <div v-for="link in links" :key="link.text" class="nav-button"><router-link :to="link.path">{{ link.text }}</router-link></div>
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
  data() {
    return {
      links: [
        {
          text: "Daymar",
          path: "/location/Daymar"
        },
        {
          text: "Yela",
          path: "/location/Yela"
        }
      ]
    }
  }
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