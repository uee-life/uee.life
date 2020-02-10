<template>
    <div class="loading">
        <img src="~/assets/loading.gif" >
    </div>
</template>

<script>
export default {
  layout: ({ isMobile }) => isMobile ? 'mobile' : 'default',
  mounted () {
    const unsetToken = require('~/utils/auth').unsetToken
    const logout = require('~/utils/lock').logout

    unsetToken(this)
    logout()
  }
}
</script>
