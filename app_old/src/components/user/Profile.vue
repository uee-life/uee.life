<template>
  <div class="profile">
    <left-dock :nav="false"/>
    <portal to="navigationPane"></portal>
    <div class="profile-main">
      <profile-verify v-if="!verified" :user="user" :errors="errors.verification" @verify="verifyHandle"/>
      <profile-info v-if="user" :user="user"/>
      <div v-if="debug" class="debug">
        <pre>{{ JSON.stringify(user, null, 2) }}</pre>
      </div>
    </div>
    <right-dock />
  </div>
</template>

<script>
import axios from "axios"

import ProfileInfo from '@/components/user/ProfileInfo.vue'
import ProfileVerify from '@/components/user/ProfileVerify.vue'
//import HomeSelect from '@/components/user/HomeSelect.vue'

export default {
    name: "profile",
    components: {
      ProfileInfo,
      ProfileVerify,
   //   HomeSelect
    },
    data() {
      return {
        user: null,
        debug: false,
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
    mounted() {
      this.getUser()
    },
    methods: {
      async getUser() {
        const token = await this.$auth.getTokenSilently();
        axios({
          url: `https://api.uee.life/user`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then((res) => {
          // eslint-disable-next-line
          console.log(res)
          this.user = res.data
          this.$store.commit('setUser', res.data)
        }).catch((error) => {
          // eslint-disable-next-line
          console.error(error)
        })
      },
      async verifyHandle() {
        const token = await this.$auth.getTokenSilently();
        const handle = this.$auth.user["https://uee.life/app_metadata"].handle

        axios({
          url: `https://api.uee.life/citizen/${handle}/verify`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then((res) => {
          // eslint-disable-next-line
          console.log(res)
          if(!res.data.success) {
            this.errors.verification = "Unable to verify token. Did you copy it to your bio?"
          } else {
            this.errors.verification = ""
          }
          this.user = res.data.user
        }).catch(function(err) {
          // eslint-disable-next-line
          console.error(err)
        })
      }
    }
}
</script>

<style scoped>
  .profile {
    position: relative;
    width: 100%;
    display: flex;
  }

  .profile-main {
    width: 100%;
    padding: 10px;
  }

  .debug {
    display: flex;
    overflow: hidden;
  }
</style>