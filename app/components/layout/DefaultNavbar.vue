<template>
  <div class="nav-bar" id="nav-bar">
      <div class="nav-left">
        <nuxt-link class="nav-button" to="/citizens">Citizens</nuxt-link>
        <nuxt-link class="nav-button" to="/orgs">Organizations</nuxt-link>
        <nuxt-link class="nav-button" to="/system/stanton">Star Systems</nuxt-link>
      </div>
      <div class="nav-right">
        <nuxt-link class="nav-button" to="/tools">Tools</nuxt-link>
        <nuxt-link v-if="isAuthenticated" class="nav-button" to="/settings">Settings</nuxt-link>
        <nuxt-link v-if="!isAuthenticated" class="nav-button" to="/auth/sign-in">Sign In</nuxt-link>
        <nuxt-link v-else to="/auth/sign-off" class="nav-button">Sign Off</nuxt-link>
      </div>
    <span class="corner top left"></span>
    <span class="corner top right"></span>
    <span class="corner bottom left"></span>
    <span class="corner bottom right"></span>
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
    .nav-bar {
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        flex-grow: 1;
        border: 1px solid #546f84;
        margin: 10px 10px 20px 10px;
        padding: 5px;
        background: url('/images/fading-bars.png') repeat;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        position: relative;
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
</style>