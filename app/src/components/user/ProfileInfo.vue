<template>
  <main-panel id="profile-info" title="User Profile" mainClass="profile-info">
      <div v-if="user" class="info">
          <div class="line-item"><div>Username: </div> <div> {{user.username}}</div></div>
          <div class="line-item"><div>Email: </div> <div> {{user.email}}</div></div>
          <div class="line-item"><div>Verified: </div> <div> {{ isVerified(user.email_verified) }}</div></div>
            <br />
          <div class="line-item"><div>Handle: </div> <div> {{user.app_metadata.handle}}</div></div>
          <div class="line-item"><div>Verified: </div> <div> {{ isVerified(user.app_metadata.handle_verified) }}</div></div>
      </div>
  </main-panel>
</template>

<script>
import { TimelineLite } from "gsap"

export default {
    name: "profile-info",
    props: ["user"],
    data() {
        return {
        }
    },
    watch: {
        'user': {
            handler: function() {
                const timeline = new TimelineLite()
                timeline.to(".portrait", 0.5, {opacity: 1})
                timeline.to(".portrait", 1, {width: "150px", height: "150px"})
                timeline.to(".portrait img", 0.5, {opacity: 1})
                timeline.to(".info", 0.5, {opacity: 1})
            }
        }
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
        width: 100%;
        height: fit-content;
        padding: 10px;
        padding-top: 20px;
        margin-top: 20px;
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
        width: 300px;
        opacity: 1;
        color: #dbf3ff;
    }
    .line-item {
        display: flex;
        justify-content: space-between;
    }
</style>