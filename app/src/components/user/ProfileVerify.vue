<template>
    <main-panel v-if="user" title="Verify Account" mainClass="profile-verify" id="profile-verify">
        <h3>Welcome to UEE.life!</h3>
        <p>To verify your account, copy the unique code from below, then paste it into your RSI account bio!</p>
        <p>Once done, return here and click on the "verify" button to complete verification.</p>
        <p class="verify-code">
            <input type="text" :value="verificationCode" readonly>
            <button @click="verify">Verify</button>
            <span v-if="errors" class="error">FAILED: {{errors}}</span>
        </p>
    </main-panel>
</template>

<script>
import { TimelineLite } from "gsap"

export default {
    name: "profile-info",
    props: ["user", "errors"],
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
    computed: {
        isVerified() {
            if(this.user.app_metadata.handle_verified) {
                return "Yes"
            } else {
                return "No"
            }
        },
        verificationCode() {
            return `[ueelife:${this.user.verificationCode}]`
        }
    },
    methods: {
        async verify() {
            this.$emit('verify')
        }
    }
}
</script>

<style scoped>
    .profile-verify {
        position: relative;
        display: flex;
        width: 100%;
        height: fit-content;
        padding: 10px;
        padding-top: 20px;
        margin-top: 20px;
    }

    .profile-verify input {
        color: #dbf3ff;
        width: 450px;
    }
    .verify-code {
        display: flex;
        flex-wrap: wrap;
        align-self: center;
    }
    .verify-code>button {
        margin-left: 5px;
        padding: 10px;
    }
    .verify-code>span {
        margin-left: 15px;
        align-self: center;
        color: red;
    }
</style>