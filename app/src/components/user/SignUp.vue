<template>
    <form id="signup">
        <fieldset>
            <legend>Sign up</legend>
            <p>
            <input class="form-input" type="email" id="signup-email" placeholder="Email" required/>
            </p>
            <p>
            <input class="form-input" type="password" id="signup-password" placeholder="Password" required/>
            </p>
            <p>
            <input class="form-input" type="text" id="handle" placeholder="Handle" required/>
            </p>
            <input type="submit" value="Sign up"/>
        </fieldset>
    </form>
</template>

<script>
import axios from "axios"
import {lock} from "../../auth"

export default {
    name: 'signup',
    methods: {
        async signup() {
            axios.post('https://apiurl/dbconnections/signup', {
                headers: {
                    'content-type': 'application/json'
                },
                data: {
                    client_id: 'yu63VPdVtrk1JXE9OB0oN97x95aEdys1',
                    email: '$(\'#signup-email\').val()',
                    password: '$(\'#signup-password\').val()',
                    connection: 'Username-Password-Authentication',
                    user_metadata: {
                        handle: '$(\'#handle\').val()'
                    }
                }
            })
        }
    },
    mounted() {
        lock.show();
    }
}
</script>

<style scoped>
    .form-input {
        color: white;
    }
</style>