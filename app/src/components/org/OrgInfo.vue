<template>
  <div id="org-info" class="org-info">
    <div class="org-banner">
      <div class="banner-img" :style="style"></div>
      <div class="mask"></div>
      <div class="org-banner-bottom">
        <div class="org-logo" id="org-logo">
          <img :src="org.logo" />
        </div>
        <div class="org-banner-name">{{org.name}} / {{org.tag}}</div>
      </div>
      <span class="corner top left"></span>
      <span class="corner top right"></span>
      <span class="corner bottom left"></span>
      <span class="corner bottom right"></span>
    </div>
    <div class="org-details">
        <div class="line-item"><div>Name:</div><div>{{org.name}}</div></div>
        <br>
        <div>
          Headquarters:
          <ul>
            <li class="line-item"><div>System</div>-<div>Unknown</div></li>
            <li class="line-item"><div>Planet</div>-<div>Unknown</div></li>
            <li class="line-item"><div>City:</div>-<div>Unknwown</div></li>
          </ul>
        </div>
      </div>
  </div>
</template>

<script>
import { TimelineLite } from "gsap"

export default {
  name: 'org-info',
  props: ['org'],
  computed: {
    style () {
      return 'background: url("' + this.org.banner + '") center center / cover'
    }
  },
  watch: {
    org: {
      handler: function () {
        const timeline = new TimelineLite()
        timeline.to(".org-logo", 0.5, {opacity: 1})
        timeline.to(".org-logo", 1, {width: "150px", height: "150px"})
        timeline.to(".org-logo img", 0.5, {opacity: 1})
        timeline.to(".org-info .org-details", 0.5, {opacity: 1})
      }
    }
  }
}
</script>

<style>
    .org-info {
      position: relative;
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 250px;
    }
    .org-logo{
        width: 50px;
        height: 50px;
        padding: 7px;
        margin-right: 20px;
        position: relative;
        opacity: 0;
    }

    .org-banner {
      position: relative;
      width: 100%;
      padding-bottom: 67px;
    }

    .org-banner .banner-img {
      opacity: 0.8 !important;
      border: 1px solid grey;
      display: block;
      height: 250px;
      background-size: cover;
      background-position: center center;
    }

    .org-banner-bottom {
      position: absolute;
      bottom: 0;
      left: 0;
      margin: 5px;
      display: flex;
      justify-content: end;
    }

    .org-logo img {
        width: 136px;
        height: 136px;
        opacity: 0;
        margin-left: 5px;
    }
    .org-details {
        width: fit-content;
        opacity: 0;
        margin-left: 30px;
        margin-top: 10px;
    }
    .line-item {
        display: flex;
        justify-content: space-between;
    }
</style>