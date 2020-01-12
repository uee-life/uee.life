<template>
    <form id="signup" @submit.prevent="signup">
        <fieldset>
            <legend>Sign up</legend>
            <p v-if="errors.length">
                <b>Please correct the following error(s):</b>
                <ul>
                    <li v-for="error in errors" :key="error">{{ error }}</li>
                </ul>
            </p>
            <p>
            <input class="form-input" type="email" id="signup-email" placeholder="Email" v-model="email" required/>
            </p>
            <p>
            <input class="form-input" type="text" id="signup-handle" placeholder="RSI Handle" v-model="handle" required/>
            </p>
            <p>
            <input class="form-input" type="password" id="signup-password" placeholder="Password" v-model="password" required/>
            </p>
            <input type="submit"  value="Sign up"/>
        </fieldset>
    </form>
</template>

<script>
import axios from "axios"

export default {
    name: 'signup',
    data() {
        return {
            errors: [],
            email: '',
            password: '',
            handle: ''
        }
    },
    methods: {
        checkPassword: function() {
            return true
        },
        checkForm: function() {
            if(this.user && this.email && this.handle && this.checkPassword()) {
                return true;
            }

            this.errors = [];

            if(!this.email) {
                this.errors.push('Email required.');
            }
            if(!this.handle) {
                this.errors.push('Handle required')
            }
        },
        async signup() {
            axios({
                url: 'https://ueelife-test.auth0.com/dbconnections/signup',
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                data: {
                    client_id: 'yu63VPdVtrk1JXE9OB0oN97x95aEdys1',
                    username: this.user,
                    email: this.email,
                    password: this.password,
                    "connection": 'Username-Password-Authentication',
                    user_metadata: {
                        handle: this.handle
                    }
                }
            }).then() // handle errors here... i.e. password complexity
        }
    }
}
</script>

<style scoped>
    .form-input {
        color: white;
    }
</style>