<template>
  <div class="nav-bar" id="nav-bar">
      <div class="nav-left">
        <div class="nav-button"><router-link to="/">Home</router-link></div>
        <div class="nav-button"><router-link to="/citizens">Citizen Registry</router-link></div>
        <div class="nav-button"><router-link to="/orgs">Org Directory</router-link></div>
        <div class="nav-button"><a href="https://robertsspaceindustries.com/starmap" target="_blank">Starmap</a></div>
        <div class="nav-button"><a href="https://robertsspaceindustries.com/galactapedia" target="_blank">Galactapedia</a></div>
      </div>
      <div class="nav-right">
        <div class="nav-button"><router-link to="/signup">Tools</router-link></div>
        <div v-if="$auth.isAuthenticated" class="nav-button"><router-link to="/settings">Settings</router-link></div>
      </div>
    <span class="corner top left"></span>
    <span class="corner top right"></span>
    <span class="corner bottom left"></span>
    <span class="corner bottom right"></span>
  </div>
</template>

<script>
export default {
  name: 'navbar',
  methods: {

  }
}
</script>

<style scoped>
    .nav-bar {
        display: flex;
        justify-content: space-between;
        flex-grow: 1;
        height: 35px;
        border: 1px solid #546f84;
        margin: 10px 10px 0 10px;
        padding: 3px;
        background: url('/images/fading-bars.png') repeat;
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
        margin-left: 10px;
        margin-right: 10px;
    }
    .nav-button>a {
      text-decoration: none;
      color: #39ced8;
    }
    .nav-button>a:hover {
      color: #dbf3ff;
    }
</style>