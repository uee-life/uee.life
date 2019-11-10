<template>
  <div class="main-header" id="main-header">
      <div class="main-header-left">
      <router-link to="/"><img class="logo" alt="logo" src="@/assets/logo.png"></router-link>
      <div class="title">
          <div>Your UEE Life...</div>
      </div>
      </div>
      <div class="main-header-right">
          <div class="user">
              Welcome, <b>Flint McBane</b>
          </div>
          <div class="search">
              <input type="search" class="search-box" value="Search">
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name: "main-header"
}
</script>

<style scoped>
    .main-header {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 110px;
        border: 1px solid black;
        background: rgba(13, 46, 66, 0.5);
    }
    .main-header-left {
        display: flex;
    }
    .title {
        align-self: center;
    }
    .title div {
        font-size: 20px;
    }
    .main-header-right {
        display: flex;
        flex-direction: column;
        margin: 15px;
    }
    .user {
        text-align: right;
    }
    .search {
        margin-top: 35px;
    }
    .search-box {
        background: white;
        height: 25px;
    }
    .logo {
        width: 90px;
        height: 90px;
        margin: 10px;
        align-self: center;
    }
</style>