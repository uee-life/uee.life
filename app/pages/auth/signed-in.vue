<template>
  <p>Signing in...</p>
</template>

<script>
import { setToken, checkSecret, extractInfoFromHash } from '~/utils/auth'

export default {
  mounted () {
    const { access_token, token, secret, error, error_msg } = extractInfoFromHash()
    if (error !== undefined || !checkSecret(secret) || !token) {
      console.error('Something happened with the Sign In request')
      this.$swal.fire(error, decodeURIComponent(error_msg), 'warning')
    } else {
      setToken(token, access_token)
    }
    //this.$router.replace('/')
  }
}
</script>
