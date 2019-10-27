<template>
  <div class="nav-bar" id="nav-bar">
      <div class="nav-left">
        <div class="nav-button"><router-link to="/citizen">My Profile</router-link></div>
        <div class="nav-button"><router-link to="/org">My Org</router-link></div>
        <div class="nav-button"><router-link to="/location">My Home</router-link></div>
      </div>
      <div class="nav-right">
        <div class="nav-button">Tools</div>
      </div>
    <span class="corner top left"></span>
    <span class="corner top right"></span>
    <span class="corner bottom left"></span>
    <span class="corner bottom right"></span>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
    .nav-bar {
        display: flex;
        justify-content: space-between;
        width: calc(100% - 20px);
        height: 35px;
        border: 1px solid grey;
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
    .nav-button a {
      text-decoration: none;
      color: #39ced8;
    }
</style>