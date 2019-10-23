<template>
  <div class="main-header" id="main-header">
      <img class="logo" alt="logo" src="@/assets/logo.png">
      <div class="main-header-right">
          <div class="user">
              Welcome, Citizen
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
        height: 120px;
        border: 1px solid black;
        background: rgba(13, 46, 66, 0.5);
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
        margin-top: 15px;
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