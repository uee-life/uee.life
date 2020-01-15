<template>
  <dock-item title="Tools" mainClass="citizen-tools">
    <div class="tool-button" @click="sync">Sync Profile</div>
  </dock-item>
</template>

<script>
import axios from "axios"
import { mapGetters } from 'vuex'
import swal from 'sweetalert'

export default {
    name: 'citizen-tools',
    computed : {
        ...mapGetters(['accessToken'])
    },
    methods: {
        async sync() {
            // eslint-disable-next-line
            console.log('Syncing...')
            const token = this.accessToken;
            axios({
                url: `https://api.uee.life/sync`,
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => {
                // eslint-disable-next-line
                console.log(res.data)
                if(res.data.success) {
                    const options = {
                        position: 'top-center',
                        duration: 3000
                    }
                    this.$swal.fire('Success!', 'Profile successfully synchronized!', 'success')
                    this.$emit('syncSuccess', res.data.citizen)
                } else {
                    const options = {
                        position: 'top-center',
                        duration: 3000
                    }
                    this.$toasted.show(res.data.error, options)
                    this.$emit('syncSuccess')
                }
            }).catch((err) => {
                //eslint-disable-next-line
                console.error(err)
            })
        }
    }
}
</script>

<style>
    .tool-button {
        cursor: pointer;
    }

    .tool-button:hover {
        color: #dbf3ff;
    }
</style>