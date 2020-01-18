<template>
  <div class="lock" id="auth0-lock"/>
</template>

<script>
export default {
  middleware: 'anonymous',
  mounted () {
    this.$nextTick(() => {
      const showLogin = require('~/utils/lock').showLogin
      showLogin('auth0-lock')
    })
  }
}
</script>

<style scoped>
  
</style>