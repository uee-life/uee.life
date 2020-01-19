<template>
  <div class="nav-bar" id="nav-bar">
      <Slide class='slide'>
        <nuxt-link class="nav-button" to="/">Home</nuxt-link>
        <nuxt-link class="nav-button" to="/citizens">Citizen Registry</nuxt-link>
        <nuxt-link class="nav-button" to="/orgs">Org Registry</nuxt-link>
        <nuxt-link class="nav-button" to="/system/stanton">System Directory</nuxt-link>
        <nuxt-link v-if="isAuthenticated" class="nav-button" to="/profile">Profile</nuxt-link>
        <nuxt-link v-if="!isAuthenticated" class="nav-button" to="/auth/sign-in">Sign In</nuxt-link>
        <nuxt-link v-else to="/auth/sign-off" class="nav-button">Sign Off</nuxt-link>
      </Slide>
      <span class="title">uee.life</span>
      <img class="logo" alt="logo" src="~assets/logo.png">
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'navbar',
  computed: mapGetters(['isAuthenticated']),
}
</script>

<style scoped>
    @font-face {
        font-family: spaceage;
        src:url("~assets/fonts/spaceage.ttf");
    }
    .nav-bar .title {
        align-self: center;
        font-family: spaceage;
        font-size: 25px;
    }
    .nav-bar {
        position: fixed;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        flex-grow: 1;
        border: 1px solid #546f84;
        padding: 5px;
        background: rgba(13, 46, 66, 0.8);
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        overflow: hidden;
        height: 52px;
        width: 100%;
        top: 0;
        z-index: 1000;
    }

    .nav-left {
        display: flex;
        align-self: center;
    }

    .nav-right {
      display: flex;
      align-self: center;
    }

    .nav-button {
        font-family: 'Michroma';
        font-size: 11px;
        margin-left: 10px;
        margin-right: 10px;
    }
    .nav-button a {
      text-decoration: none;
      color: #39ced8;
    }
    .nav-button a:hover {
      color: #dbf3ff;
    }

    .header {
        display: flex;
        margin-bottom: 20px;
    }
    a {
        margin-right: 20px;
        font-size: 14px;
        color: #39ced8;
        text-decoration: none;
        text-transform: uppercase;
        border-bottom: none;
        transition: color .25s;
        font-weight: 400;
        line-height: normal;
    }
    a:hover {
        color: #dbf3ff;
    }
    a.nuxt-link-active {
        color: #dbf3ff;
        border: none;
        font-weight: 600;
    }

    .logo {
      position: absolute;
      right:15px;
      top: 0;
      margin: 2px;
      width: 46px;
      height: 46px;
    }
</style>
<style>
    .slide .bm-burger-button {
      position: fixed;
      width: 36px;
      height: 30px;
      left: 25px;
      top: 10px;
      cursor: pointer;
    }

    .slide .bm-burger-bars {
      background-color: #39ced8;
    }
    .line-style {
      position: absolute;
      height: 20%;
      left: 0;
      right: 0;
    }
    .cross-style {
      position: absolute;
      top: 12px;
      right: 2px;
      cursor: pointer;
    }
    .bm-cross {
      background: #bdc3c7;
    }
    .bm-cross-button {
      height: 24px;
      width: 24px;
    }
    .bm-menu {
      height: 100%; /* 100% Full-height */
      width: 0; /* 0 width - change this with JavaScript */
      position: fixed; /* Stay in place */
      z-index: 1000; /* Stay on top */
      top: 0;
      left: 0;
      background-color: rgb(63, 63, 65); /* Black*/
      overflow-x: hidden; /* Disable horizontal scroll */
      padding-top: 60px; /* Place content 60px from the top */
      transition: 0.5s; /*0.5 second transition effect to slide in the sidenav*/
    }
 
    .bm-overlay {
      background: rgba(0, 0, 0, 0.3);
    }
    .bm-item-list {
      color: #b8b7ad;
      margin-left: 10%;
      font-size: 20px;
    }
    .bm-item-list > * {
      display: flex;
      text-decoration: none;
      padding: 0.7em;
    }
    .bm-item-list > * > span {
      margin-left: 10px;
      font-weight: 700;
      color: white;
    }
</style>