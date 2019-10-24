<template>
  <div id="citizen-info" class="citizen-info">
      <div class="portrait" id="portrait">
          <img class="portrait-img" :src="user.portrait" />
            <span class="corner top left"></span>
          <span class="corner top right"></span>
          <span class="corner bottom left"></span>
          <span class="corner bottom right"></span>
      </div>
      <div class="info">
          <div class="line-item"><div>UEE Citizen Record:</div><div>#84348</div></div>
          <div class="line-item"><div>Name:</div><div>Flint McBane</div></div>
          <div class="line-item"><div>Handle:</div><div>Capn_Flint</div></div>
          <div class="line-item"><div>Enlisted:</div><div>Nov 18, 2942</div></div>
          <br>
          <div>
            Home:
          <ul>
              <li class="line-item"><div>System</div>-<div>Stanton</div></li>
              <li class="line-item"><div>Planet</div>-<div>Hurston</div></li>
              <li class="line-item"><div>City:</div>-<div>Lorville</div></li>
          </ul>
          </div>
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
        display: flex;
        width: 100%;
        height: 250px;
    }
    .portrait{
        width: 150px;
        height: 150px;
        border: 1px solid grey;
        padding: 7px;
        margin-right: 20px;
        background: url('/images/fading-bars.png') repeat;
        position: relative;
    }

    .portrait img {
        width: 136px;
        height: 136px;
    }
    .info {
        width: 220px;
    }
    .line-item {
        display: flex;
        justify-content: space-between;
    }
</style>