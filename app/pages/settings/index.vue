<template>
  <div class="profile">
    <template v-if="user">
      <profile-verify v-if="!verified || debug" :user="user" :errors="errors.verification" @verify="verifyHandle"/>
      <profile-info v-if="user" :user="user"/>
      <main-panel title="Settings">More coming soon...</main-panel>
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
      async verifyHandle() {
        if(this.user){
          const handle = this.user.app_metadata.handle

          this.$axios({
            url: `https://api.uee.life/citizens/${handle}/verify`,
            method: 'GET'
          }).then((res) => {
            // eslint-disable-next-line
            console.log(res)
            if(!res.data.success) {
              this.errors.verification = "Unable to verify token. Did you copy it to your bio?"
              this.$swal.fire("FAILED", res.data.msg, 'error')
            } else {
              this.$swal.fire("SUCCESS", res.data.msg, 'success')
              this.errors.verification = ""
              this.getUser()
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
    width: 100%;
    display: flex;
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
    flex-wrap: wrap;
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