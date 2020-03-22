<template>
    <div class="ship-banner">
      <div class="banner-img" :style="style"></div>
      <div class="mask">
        <div class="banner-bottom">
          <div class="logo" id="logo">
            <img :src="manufacturerLogo" />
          </div>
          <div class="ship-summary">
              <h1>{{shipID}} <span v-if="ship.name">/  <span class="tag">{{ ship.name }}</span></span></h1>
              <div class="ship-model">{{ `${ship.make} ${ship.model}` }}</div>
          </div>
        </div>
      </div>
      <span class="corner top left"></span>
      <span class="corner top right"></span>
      <span class="corner bottom left"></span>
      <span class="corner bottom right"></span>
    </div>
</template>

<script>
export default {
    props: ['ship'],
    computed: {
        manufacturerLogo() {
            return `/images/manufacturers/${this.ship.make_abbr}.png`
        },
        shipImage() {
            return `/images/ships/${this.ship.hull_name}.jpg`
        },
        shipID() {
            return `UES-${('00' + this.ship.id.toString(16).toUpperCase()).substr(-6)}`
        },
        style () {
            return 'background: url("' + this.shipImage + '") center center / cover'
        },
    },
    methods: {
    }
}
</script>

<style>
    .ship-banner {
      position: relative;
      width: 100%;
      max-width: calc(100vw - 20px);
      border: 1px solid #546f84;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
      margin-bottom: 10px;
      margin-top: 20px;
      overflow: hidden;
    }

    .ship-banner .mask {
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: url('/images/fading-bars.png') repeat;
        z-index: 0;
        padding-top: 0.1px;
    }

    .ship-banner .banner-img {
      position: absolute;
      width: 100%;
      height: 250px;
      opacity: 0.8 !important;
      border-bottom: 1px dashed #546f84;
      display: block;
      background-size: cover;
      background-position: center center;
      z-index: -1;
    }

    .ship-banner .logo{
        width: 136px;
        height: 136px;
        margin-right: 20px;
        opacity: 1;
    }

    .ship-banner .logo img {
        width: 136px;
        height: 136px;
        opacity: 1;
        margin-left: 5px;
    }

    .banner-bottom {
      bottom: 0;
      left: 0;
      padding: 5px;
      margin-top: 177px;
      display: flex;
    }

    .ship-banner h1 {
      height: fit-content;
      opacity: 1;
      font-family: 'Michroma';
      letter-spacing: 1px;
      color: #dbf3ff;
      margin: 0;
    }

    .ship-banner h1 .tag {
        color: #fff000;
    }

    .ship-summary {
      padding-top: 73px;
    }
    
    .ship-summary .ship-model::before {
      content: "[ "
    }

    .ship-summary .ship-model::after {
      content: " ]"
    }
</style>