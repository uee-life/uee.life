<template>
    <div class="loading">
        <img src="~/assets/loading.gif" >
    </div>
</template>

<script>
const config = require('~/config.json')

export default {
  methods: {
    sanitize(s) {
      var chars = {'<':'&lt;','>':'&gt;','"':'&quot;', '&':'&amp;', "'": '&#x27;', '/': '&#x2f;'};
      s = s.replace(/[<>"'\/]/g, m => chars[m]);
      return s
    },
    getQueryParams() {
      const params = {}
      this.$nuxt.$route.fullPath.replace(/([^(?|#)=&]+)(=([^&]*))?/g, ($0, $1, $2, $3) => {
        params[$1] = $3
      })
      return params
    },
    getErrors() {
      if (process.server) return
      let err, err_msg = ''
      const params = this.getQueryParams()
      if ('error' in params) {
        err = params['error'],
        err_msg = this.sanitize(decodeURIComponent(params['error_description']))
        this.$swal.fire({
          title: err, 
          text: err_msg, 
          icon: 'warning',
          onAfterClose: () => {
            window.location = `https://ueelife.auth0.com/v2/logout?returnTo=http%3A%2F%2Flocalhost:3000&client_id=${config.AUTH0_CLIENT_ID}`
          }
        })
        this.$router.replace('/')
      }
    }
  },
  mounted() {
    // Check for errors encountered via the auth flow, display then clear their auth0 session
    this.getErrors()
  }
}
</script>
