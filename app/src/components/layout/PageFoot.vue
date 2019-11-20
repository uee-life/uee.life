<template>
  <div class="page-foot">
      <img class="foot-logo" alt="logo" src="@/assets/community.png">
  </div>
</template>

<script>
export default {
    name: 'page-foot'
}
</script>

<style scoped>
    .page-foot {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 90px;
        display: flex;
        justify-content: space-between;
        background: rgba(13, 46, 66, 0.5);
        justify-content: center; 
    }
    .foot-logo {
        height: 75px;
        align-self: center;
    }
</style>