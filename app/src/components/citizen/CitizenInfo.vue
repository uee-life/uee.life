<template>
  <div id="citizen-info" class="citizen-info">
      <div class="portrait" id="portrait">
          <img class="portrait-img" :src="user.portrait" />
            <span class="corner top left"></span>
          <span class="corner top right"></span>
          <span class="corner bottom left"></span>
          <span class="corner bottom right"></span>
      </div>
  </div>
</template>

<script>
export default {
    name: "citizen-info",
    data() {
        return {
            user: {
                portrait: "https://robertsspaceindustries.com/media/lb0drmasxlhcyr/heap_infobox/Grog_fallout.png",
            }
        }
    }
}
</script>

<style>
    .citizen-info {
        width: 100%;
        height: 200px;
    }
    .portrait{
        width: 124px;
        height: 123px;
        border: 1px solid grey;
        padding: 7px;
        margin-right: 20px;
        background: url('/images/fading-bars.png') repeat;
        position: relative;
    }

    .portrait img {
        width: 110px;
        height: 109px;
    }
</style>