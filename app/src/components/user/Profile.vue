<template>
    <div>
    <div>
      <!--img :src="$auth.user.picture"-->
      <h2>{{ user.app_metadata.handle }}</h2>
      <p>{{ user.email }}</p>
      <p>Verified: {{ user.app_metadata.handle_verified}}</p>
      <button @click="verifyHandle">Verify</button>
    </div>

    <div>
      <pre>{{ JSON.stringify(user, null, 2) }}</pre>
    </div>
  </div>
</template>

<script>
import axios from "axios"

export default {
    name: "profile",
    data() {
      return {
        user: {
          app_metadata: {
            handle: "",
            handle_verified: false
          }
        }
      }
    },
    mounted() {
      this.user = this.$auth.user
      this.user.app_metadata = this.$auth.user["https://uee.life/app_metadata"]
    },
    methods: {
      async verifyHandle() {
        const token = await this.$auth.getTokenSilently();
        const handle = this.$auth.user["https://uee.life/app_metadata"].handle

        axios({
          url: `http://localhost:3001/citizen/${handle}/verify`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then((res) => {
          console.log(res)
          this.user = res.data
        }).catch(function(err) {
          console.error(err)
        })
      }
    }
}
</script>

<style>

</style>