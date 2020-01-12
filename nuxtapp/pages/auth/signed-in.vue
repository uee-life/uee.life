<template>
  <p>Signing in...</p>
</template>

<script>
import { setToken, checkSecret, extractInfoFromHash } from '~/utils/auth'
import swal from 'sweetalert'

export default {
  mounted () {
    const { token, secret, error, error_msg } = extractInfoFromHash()
    if (error !== undefined || !checkSecret(secret) || !token) {
      console.error('Something happened with the Sign In request')
      swal(error, decodeURIComponent(error_msg), 'warning')
    } else {
      setToken(token)
    }
    this.$router.replace('/')
  }
}
</script>
