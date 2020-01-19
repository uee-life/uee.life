<template>
  <p>Signing in...</p>
</template>

<script>
import { setToken, checkSecret, extractInfoFromHash } from '~/utils/auth'

export default {
  layout: ({ isMobile }) => isMobile ? 'mobile' : 'default',
  mounted () {
    console.log('mounted')
    const { access_token, token_expiry, token, secret, error, error_msg } = extractInfoFromHash()
    if (error !== undefined || !checkSecret(secret) || !token) {
      console.error('Something happened with the Sign In request')
      this.$swal.fire(error, decodeURIComponent(error_msg), 'warning')
    } else {
      console.log(token_expiry)
      setToken(this, token, access_token, token_expiry)
    }
    this.$router.replace('/')
  }
}
</script>
