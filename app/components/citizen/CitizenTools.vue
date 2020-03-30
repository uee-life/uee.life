<template>
  <dock-item title="Tools" class="citizen-tools">
    <div class="tool-button" @click="sync">Sync Profile</div>
  </dock-item>
</template>

<script>
import { gsap } from 'gsap'
import { mapGetters } from 'vuex'
import swal from 'sweetalert'

export default {
    name: 'citizen-tools',
    computed : {
        user() {
            return this.$auth.user
        }
    },
    methods: {
        async sync() {
            // eslint-disable-next-line
            console.log('Syncing...')
            const handle = this.user['https://uee.life/app_metadata'].handle
            this.$axios({
                url: `https://api.uee.life/user/sync`,
                method: 'GET'
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
                    this.$swal.fire('error', res.data.error, 'error')
                    this.$emit('syncSuccess')
                }
            }).catch((err) => {
                //eslint-disable-next-line
                console.error(err)
            })
        }
    },
    mounted() {
        gsap.to('.citizen-tools', {duration: 0.5, opacity: 1})
    }
}
</script>

<style>
    .citizen-tools {
        opacity: 0;
    }

    .tool-button {
        cursor: pointer;
    }

    .tool-button:hover {
        color: #dbf3ff;
    }
</style>