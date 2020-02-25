<template>
  <p>Signing in...</p>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Auth',
  methods: mapActions('session', ['handleAuthentication']),
  data () {
    this.handleAuthentication().then(() => {
      this.$router.replace('/')
    }).catch(err => {
      // some meaningful error handling here ...
      //this.$swal.fire('Error', err, 'error')
      console.error(err)
    })
    return {}
  }
}
</script>
