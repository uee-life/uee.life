<template>
  <main-panel id="profile-info" title="User Profile" class="profile-info">
      <div v-if="user" class="info">
          <div class="line-item"><div>Username: </div> <div> {{user.username}}</div></div>
          <div class="line-item"><div>Email: </div> <div> {{user.email}}</div></div>
          <div class="line-item"><div>Verified: </div> <div> {{ isVerified(user.email_verified) }}</div></div>
            <br />
          <div class="line-item"><div>Handle: </div> <div> {{user['https://uee.life/app_metadata'].handle}}</div></div>
          <div class="line-item"><div>Verified: </div> <div> {{ isVerified(user['https://uee.life/app_metadata'].handle_verified) }}</div></div>
      </div>
      <div v-else class="info-loading">
          <h3>Loading...</h3>
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
        color: #dbf3ff;
    }
    .line-item {
        display: flex;
        justify-content: space-between;
    }
</style>