<template>
    <form id="signup">
        <fieldset>
            <legend>Sign up</legend>
            <p>
            <input type="email" id="signup-email" placeholder="Email" required/>
            </p>
            <p>
            <input type="password" id="signup-password" placeholder="Password" required/>
            </p>
            <p>
            <input type="text" id="handle" placeholder="Handle" required/>
            </p>
            <input type="submit" value="Sign up"/>
        </fieldset>
    </form>
</template>

<script>
import axios from "axios"

export default {
    name: 'signup',
    methods: {
        async signup() {
            axios.post('https://apiurl/dbconnections/signup', {
                headers: {
                    'content-type': 'application/json'
                },
                data: {
                    client_id: '',
                    email: '$(\'#signup-email\').val()',
                    password: '$(\'#signup-password\').val()',
                    connection: '',
                    user_metadata: {
                        handle: '$(\'#handle\').val()'
                    }
                }
            })
        }
    }
}
</script>

<style>

</style>