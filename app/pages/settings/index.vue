<template>
  <div class="profile">
    <template v-if="user">
      <profile-verify class="profile-panel" v-if="!verified || debug" :user="user" :errors="errors.verification" @verify="verifyHandle"/>
      <profile-info class="profile-panel" v-if="user" :user="user" @refresh="getUser" />
      <main-panel class="profile-panel" title="Settings">More coming soon...</main-panel>
    </template>
    <template v-else>
    <div class="loading">
        <img src="~/assets/loading.gif" >
    </div>
    </template>
    <div v-if="debug" class="debug">
      <pre>{{ JSON.stringify(user, null, 2) }}</pre>
    </div>
  </div>
</template>

<script>
import ProfileInfo from '@/components/profile/ProfileInfo.vue'
import ProfileVerify from '@/components/profile/ProfileVerify.vue'
//import HomeSelect from '@/components/user/HomeSelect.vue'

export default {
    layout: ({ isMobile }) => isMobile ? 'mobile' : 'default',
    name: "profile",
    middleware: 'auth',
    components: {
      ProfileInfo,
      ProfileVerify,
   //   HomeSelect
    },
    data() {
      return {
        debug: false,
        user: null,
        errors: {
          verification: ""
        }
      }
    },
    computed: {
      verified() {
        if(this.user && this.user.app_metadata.handle_verified) {
          return true
        } else {
          return false
        }
      }
    },
    methods: {
      async getUser() {
        this.$axios({
          url: 'https://api.uee.life/user',
          method: 'GET'
        }).then((res) => {
          console.log(res.data)
          this.user = res.data
        }).catch((err) => {
          console.error(err)
        })
      },
      logOut() {
            const config = require('~/config.json')
            this.$auth.logout()
            window.location = `https://ueelife.auth0.com/v2/logout?returnTo=https%3A%2F%2Fuee.life&client_id=${config.AUTH0_CLIENT_ID}`
      },
      async verifyHandle() {
        if(this.user){
          const handle = this.user.app_metadata.handle

          this.$axios({
            url: `https://api.uee.life/user/verify`,
            method: 'POST'
          }).then((res) => {
            // eslint-disable-next-line
            console.log(res)
            if(!res.data.success) {
              this.errors.verification = "Unable to verify token. Did you copy it to your bio?"
              this.$swal.fire("FAILED", res.data.msg, 'error')
            } else {
              this.$swal.fire({
                  title: 'Success!', 
                  text: 'You are now verified! You will now be logged out. Please log back in using your existing account.',
                  icon: 'success',
                  showCancelButton: false,
                  confirmButtonColor: '#3085d6',
                  confirmButtonText: 'OK'
              }).then(() => {
                  this.logOut()
              })
            }
            this.$store.dispatch('setUser', res.data.user)
          }).catch(function(err) {
            // eslint-disable-next-line
            console.error(err)
          })
        }
      }
    },
    mounted() {
      this.getUser()
    }
}
</script>

<style scoped>
  .profile {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
    flex-wrap: wrap;
    align-content: center;
  }

  .profile-panel {
    max-width: 800px;
  }

  .debug {
    display: flex;
    overflow: hidden;
  }

.loading {
  position: absolute;
  width: 100%;
  margin-top: 20px;
}
</style>