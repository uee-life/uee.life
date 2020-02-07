<template>
    <div class="loading">
        <img src="~/assets/loading.gif" >
    </div>
</template>

<script>
import { checkSecret, updateAccessToken } from '~/utils/auth'
import { setSecret } from '~/utils/lock'
import { addSeconds } from 'date-fns'

export default {
    layout: ({ isMobile }) => isMobile ? 'mobile' : 'default',
    data() {
        return {
        }
    },
    methods: {
        handleAuth(err, res) {
            this.$store.commit('REFRESH_TOKEN', false)
            if(err) {
                console.error(err.error)
                if(err.error === 'login_required') {
                    this.$router.push('/auth/sign-in')
                } else {
                    this.$router.push('/')
                }
            } else {
                if(checkSecret(res.state)) {
                    console.log(res)
                    const expiry = addSeconds(new Date(), res.expiresIn)
                    console.log(expiry)
                    updateAccessToken(res.accessToken, expiry)
                    this.$router.go(-1)
                } else {
                    console.log('invalid request, secret no match')
                    this.$router.push('/auth/sign-off')
                }
            }
        },
        refreshAuth() {
            const checkSession = require('~/utils/lock').checkSession
            checkSession({audience: "https://ueelife-api", response_type: "token", state: localStorage.secret }, this.handleAuth);
        }
    },
    mounted() {
        this.refreshAuth()
    }
}
</script>

<style>
.loading {
  position: absolute;
  width: 100%;
  margin-top: 20px;
}
</style>