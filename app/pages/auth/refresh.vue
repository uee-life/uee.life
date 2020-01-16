<template>
    <div>Refreshing</div>
</template>

<script>
import { checkSecret, updateAccessToken } from '~/utils/auth'
import { setSecret } from '~/utils/lock'

export default {
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
                    updateAccessToken(res.accessToken)
                }
            }
            this.$router.go(-1)
        },
        refreshAuth() {
            const checkSession = require('~/utils/lock').checkSession
            checkSession({audience: "https://ueelife-api", response_type: "token", state: localStorage.secret}, this.handleAuth);
        }
    },
    mounted() {
        this.refreshAuth()
    }
}
</script>

<style>

</style>