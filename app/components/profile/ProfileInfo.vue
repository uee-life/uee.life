<template>
  <main-panel id="profile-info" title="User Profile" class="profile-info">
      <div v-if="user" class="info">
            <h3>User</h3>
            <div class="line-item"><div class="label">Username: </div> <div> {{user.username}}</div></div>
            <div class="line-item"><div class="label">Email: </div> <div> {{user.email}}</div>&nbsp;&nbsp;&nbsp; <div v-if="isVerified(user.email_verified)">(verified)</div></div>
            <div class="line-item"><div class="label">Created: </div> <div> {{new Date(user.created_at).toDateString()}} @ {{new Date(user.created_at).toLocaleTimeString()}}</div></div>
            <div class="line-item"><div class="label">Last Login: </div> <div> {{new Date(user.last_login).toDateString()}} @ {{new Date(user.last_login).toLocaleTimeString()}}</div></div>
            <br />
            <h3>RSI Connection</h3>
          <div class="line-item"><div class="label">RSI Handle: </div> <div> {{user.app_metadata.handle}}</div></div>
          <div class="line-item"><div class="label">Verified: </div> <div> {{ isVerified(user.app_metadata.handle_verified) }}</div></div>
          <div class="line-item"><div class="label">Change Handle: </div> <div><input type="text" v-model="handle"> <input type="button" value="change" @click="ifSure(changeHandle)" /></div></div>
          <em style="color: red; opacity:0.8">Warning: Changing handle revokes verification status, and deletes all ships and discoveries! Proceed with caution!</em>
      </div>
  </main-panel>
</template>

<script>
import { gsap } from "gsap"

export default {
    name: "profile-info",
    props: ["user"],
    data() {
        return {
            handle: null
        }
    },
    mounted() {
        gsap.to(".profile-info", {duration: 0.5, opacity: 1})
    },
    methods: {
        isVerified(item) {
            if(item) {
                return "Yes"
            } else {
                return "No"
            }
        },
        logOut() {
            const config = require('~/config.json')
            this.$auth.logout()
            window.location = `https://ueelife.auth0.com/v2/logout?returnTo=http%3A%2F%2Flocalhost:3000&client_id=${config.AUTH0_CLIENT_ID}`
        },
        changeHandle() {
            console.log('changing handle')
            this.$axios({
                url: 'https://api.uee.life/user',
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json; charset=utf-8'
                },
                data: { handle: this.handle }
            }).then((res) => {
                // log in again to refresh user data
                console.log(res.data)
                if(res.data.error) {
                    this.$swal.fire('warning', res.data.error, 'warning')
                } else {
                    this.$swal.fire({
                        title: 'Success!', 
                        text: 'Handle changed! You will now be logged out. Please log back in using your existing account.',
                        icon: 'success',
                        showCancelButton: false,
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'OK'
                    }).then(() => {
                        this.logOut()
                    })
                }
            }).catch((err) => {
                this.$swal.fire('Error Changing Handle', err, 'error')
            })
        },
        ifSure(cb) {
            this.$swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, change it!'
            }).then((result) => {
                if (result.value) {
                    cb()        
                }
            })
        }
    }
}
</script>

<style scoped>
    .profile-info {
        position: relative;
        display: flex;
        height: fit-content;
        padding: 10px;
        padding-top: 20px;
        margin-bottom: 20px;
        opacity: 0;
    }

    .profile-info .portrait{
        width: 50px;
        height: 50px;
        padding: 7px;
        margin-right: 20px;
        background: url('/images/fading-bars.png') repeat;
        position: relative;
        opacity: 0;
    }

    .profile-info .portrait img {
        width: 136px;
        height: 136px;
        opacity: 0;
    }
    .profile-info .info {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        justify-content: space-between;
        opacity: 1;
    }
    .line-item {
        display: flex;
        margin-left: 15px;
    }
    .line-item .label {
        width: 110px;
    }
</style>