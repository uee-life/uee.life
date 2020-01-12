<template>
    <div class="page-head">
        <div class="page-head-left">
            <router-link to="/"><img class="logo" alt="logo" src="@/assets/logo.png"></router-link>
            <div class="title">
                <div>The portal to your life in the UEE...</div>
            </div>
        </div>
        <div class="page-head-right">
            <div v-if="!$auth.loading" class="user">
                <div v-if='$auth.isAuthenticated' class="welcome">
                    Welcome, <router-link :to="citizenLink"><b>{{ $auth.user["https://uee.life/app_metadata"].handle }}</b></router-link>
                </div>
                <div v-if='$auth.isAuthenticated'>
                    [ <a @click='logout'> Log Out </a> ]
                </div>
                <div v-else>
                    Welcome! Please <a @click='login' id="login-button">Log In / Sign Up</a>
                </div>
            </div>
            <div class="search">
                <!--input type="search" class="search-box" value="Search"-->
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'page-head',
    computed: {
        citizenLink() {
            return `/citizens/${this.$auth.user["https://uee.life/app_metadata"].handle}`
        }
    },
    methods: {
        login() {
            this.$auth.loginWithRedirect();
        },
        logout() {
            this.$auth.logout({
                returnTo: window.location.origin
            });
        }
    }
}
</script>

<style scoped>
    @font-face {
        font-family: spaceage;
        src:url("/fonts/spaceage.ttf");
    }

    .page-head {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 110px;
        border: 1px solid black;
        background: rgba(13, 46, 66, 0.5);
    }

    .page-head-left {
        display: flex;
    }

    .page-head-left .logo {
        width: 90px;
        height: 90px;
        margin: 10px;
        align-self: center;
    }

    .page-head-left .title {
        align-self: center;
        font-family: spaceage;
        font-size: 20px;
    }

    .page-head-right {
        display: flex;
        flex-direction: column;
        margin: 15px;
    }

    .page-head-right .user {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }

    .page-head-right .user a {
        cursor: pointer;
    }

    .page-head-right .user .welcome>a {
        color: #39ced8;
        text-decoration: none;
    }

    .page-head-right .user .welcome>a:hover {
        color: #dbf3ff;
    }

    .page-head-right .search {
        margin-top: 35px;
    }

    .page-head-right .search .search-box {
        background: white;
        height: 25px;
    }
</style>