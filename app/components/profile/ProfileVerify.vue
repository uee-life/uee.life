<template>
    <main-panel v-if="user" title="Verify Account" class="profile-verify" id="profile-verify">
        <h3>Welcome to UEE.life!</h3>
        <p>To verify your account, copy the unique code from below, then paste it into your <a href="https://robertsspaceindustries.com/account/profile">RSI account bio</a>!</p>
        <p>Once done, return here and click on the "verify" button to complete verification.</p>
        <p class="verify-code">
            <input type="text" :value="verificationCode" readonly>
            <button @click="verify">Verify</button>
            <span v-if="errors" class="error">FAILED: {{errors}}</span>
        </p>
    </main-panel>
</template>

<script>
import { gsap } from "gsap"

export default {
    name: "profile-verify",
    props: ["user", "errors"],
    data() {
        return {
        }
    },
    computed: {
        verificationCode() {
            return `[ueelife:${this.user.verificationCode}]`
        }
    },
    methods: {
        async verify() {
            this.$emit('verify')
        }
    },
    watch: {
        user: function() {
            this.$nextTick(() => {
                gsap.to(".profile-verify", {duration: 0.5, opacity: 1})
            })
        }
    },
    mounted() {
        if(this.user) {
            gsap.to(".profile-verify", {duration: 0.5, opacity: 1})
        }
    }
}
</script>

<style scoped>
    .profile-verify {
        position: relative;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        width: 100%;
        height: fit-content;
        padding: 10px;
        padding-top: 20px;
        opacity: 0;
    }

    .profile-verify input {
        color: #dbf3ff;
        background: none;
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
        color: #39CED8;
        background-color: rgb(13, 46, 66);
        border: none;
        cursor: pointer;
    }
    .verify-code>span {
        margin-left: 15px;
        align-self: center;
        color: red;
    }
</style>