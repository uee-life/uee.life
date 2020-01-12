<template>
    <div class="org-banner">
      <div class="banner-img" :style="style"></div>
      <div class="mask">
        <div class="org-banner-bottom">
          <div class="org-logo" id="org-logo">
            <img :src="org.logo" />
          </div>
          <div class="org-summary">
              <h1>{{org.name}} /  <span class="tag">{{ tag }}</span></h1>
              <div class="org-model">{{org.model}}</div>
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
  name: 'org-banner',
  props: ["org"],
  computed: {
    style () {
      return 'background: url("' + this.org.banner + '") center center / cover'
    },
    tag () {
      if(this.org.tag){
        return this.org.tag.toUpperCase()
      } else {
        return this.org.tag
      }
    }
  },
}
</script>

<style>

    .org-banner {
      position: relative;
      width: 100%;
      border: 1px solid grey;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }

    .org-banner .mask {
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: url('/images/fading-bars.png') repeat;
        z-index: 0;
        padding-top: 0.1px;
    }

    .org-banner .banner-img {
      position: absolute;
      width: 100%;
      height: 250px;
      opacity: 0.8 !important;
      border-bottom: 1px dashed grey;
      display: block;
      background-size: cover;
      background-position: center center;
      z-index: -1;
    }

    .org-logo{
        width: 136px;
        height: 136px;
        margin-right: 20px;
        opacity: 0;
    }

    .org-banner-bottom {
      bottom: 0;
      left: 0;
      padding: 5px;
      margin-top: 177px;
      display: flex;
    }

    .org-banner h1 {
      height: fit-content;
      opacity: 0;
      font-family: 'Michroma';
      font-size: 1.45em;
      letter-spacing: 1px;
      color: #dbf3ff;
      margin: 0;
    }

    .org-banner h1 .tag {
        font-size: 18px;
        color: #fff000;
    }

    .org-logo img {
        width: 136px;
        height: 136px;
        opacity: 0;
        margin-left: 5px;
    }

    .org-summary {
      padding-top: 73px;
    }
    
    .org-summary .org-model::before {
      content: "[ "
    }

    .org-summary .org-model::after {
      content: " ]"
    }
</style>