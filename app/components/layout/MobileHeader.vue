<template>
    <div class="page-head">
        <div class="page-head-left">
            <nuxt-link to="/"><img class="logo" alt="logo" src="~assets/logo.png"></nuxt-link>
            <div class="title">
                The portal to your life in the UEE...
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'main-header',
    computed: {
        ...mapGetters([
            'isAuthenticated', 
            'loggedUser',
        ]),
        citizenLink() {
            if(this.isAuthenticated && this.loggedUser) {
                return `/citizens/${this.loggedUser.app_metadata.handle}`
            } else {
                return `/citizens`
            }
        }
    }
}
</script>

<style scoped>
    @font-face {
        font-family: spaceage;
        src:url("~assets/fonts/spaceage.ttf");
    }

    .page-head {
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 70px;
        border: 1px solid black;
        background: rgba(13, 46, 66, 0.5);
        margin-bottom: 10px;
        margin-top: 50px;
    }

    .page-head-left {
        display: flex;
    }

    .page-head-left>a {
        border: none;
    }

    .page-head-left .logo {
        width: 50px;
        height: 50px;
        margin: 10px;
        align-self: center;
    }

    .page-head-left .title {
        align-self: center;
        font-family: spaceage;
        font-size: 15px;
    }
</style>