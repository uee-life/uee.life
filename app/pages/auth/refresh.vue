<template>
    <div>Refreshing</div>
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
            if(err) {
                console.error(err)
            } else {
                if(checkSecret(res.state)) {
                    console.log(res)
                    const expiry = addSeconds(new Date(), res.expiresIn)
                    console.log(expiry)
                    updateAccessToken(res.accessToken, expiry)
                }
            }
            this.$store.commit('REFRESH_TOKEN', false)
            this.$router.go(-1)
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

</style>