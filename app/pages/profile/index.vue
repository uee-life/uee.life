<template>
  <div class="profile">
    <portal to="navigationPane"></portal>
    <div class="profile-main">
      <profile-verify v-if="!verified" :user="loggedUser" :errors="errors.verification" @verify="verifyHandle"/>
      <profile-info v-if="user" :user="user"/>
      <div v-if="debug" class="debug">
        <pre>{{ JSON.stringify(user, null, 2) }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import { mapGetters } from 'vuex'

import ProfileInfo from '@/components/profile/ProfileInfo.vue'
import ProfileVerify from '@/components/profile/ProfileVerify.vue'
//import HomeSelect from '@/components/user/HomeSelect.vue'

export default {
    layout: 'no-dock',
    name: "profile",
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
      ...mapGetters(['loggedUser', 'loggedCitizen', 'accessToken']),
      verified() {
        if(this.loggedUser && this.loggedUser.handle_verified) {
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
        const token = this.accessToken;
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
          //this.$store.dispatch('setUser', res.data)
        }).catch((error) => {
          // eslint-disable-next-line
          console.error(error)
          this.$router.push('/auth/refresh')
        })
      },
      async verifyHandle() {
        const token = this.accessToken;
        const handle = this.loggedUser.handle

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
          //this.$store.dispatch('setUser', res.data.user)
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