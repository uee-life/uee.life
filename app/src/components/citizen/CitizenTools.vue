<template>
  <dock-item title="Tools" mainClass="citizen-tools">
    <div class="tool-button" @click="sync">Sync Profile</div>
  </dock-item>
</template>

<script>
import axios from "axios"

export default {
    name: 'citizen-tools',
    methods: {
        async sync() {
            // eslint-disable-next-line
            console.log('Syncing...')
            const token = await this.$auth.getTokenSilently();
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
                    this.$toasted.show("Citizen Data Synchronized!", options)
                    this.$emit('syncSuccess', res.data.citizen)
                } else {
                    const options = {
                        position: 'top-center',
                        duration: 3000
                    }
                    this.$toasted.show("Synchronization Failed... Flint probably broke something :(", options)
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