<template>
    <div class="org-banner">
      <div class="banner-img" :style="style"></div>
      <div class="mask"></div>
      <div class="org-banner-bottom">
        <div class="org-logo" id="org-logo">
          <img :src="org.logo" />
        </div>
        <div class="org-summary">
            <h1>{{org.name}} /  <span class="tag">{{ tag }}</span></h1>
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
      padding-bottom: 67px;
      border: 1px solid grey;
    }

    .org-banner .banner-img {
      opacity: 0.8 !important;
      border-bottom: 1px dashed grey;
      display: block;
      height: 250px;
      background-size: cover;
      background-position: center center;
    }

    .org-logo{
        width: 136px;
        height: 136px;
        margin-right: 20px;
        position: relative;
        opacity: 0;
    }

    .org-banner-bottom {
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 5px;
      display: flex;
      align-items: flex-end;
    }

    .org-banner h1 {
      height: 57px;
      opacity: 0;
      font-family: 'Michroma';
      font-size: 1.45em;
      letter-spacing: 1px;
      color: white;
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
</style>