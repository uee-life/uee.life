<template>
  <div class="main-header" id="main-header">
      <img class="logo" alt="logo" src="@/assets/logo.png">
      Header
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
        width: 100%;
        height: 100px;
        border: 1px solid black;
        background: rgba(13, 46, 66, 0.5);
    }
    .logo {
        width: 90px;
        margin: 2px;
    }
</style>