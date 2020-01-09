<template>
  <div v-if="$auth.isAuthenticated && isOwner" class="citizen-location">
        Hello World {{user}}
  </div>
</template>

<script>
export default {
    name: "citizen-location",
    props: ["citizen"],

    computed: {
        isOwner() {
            const meta = this.$auth.user["https://uee.life/app_metadata"]
            if(meta && meta.handle == this.citizen.info.handle && meta.handle_verified) {
                return true
            }
            return false
        },
        user() {
            return this.$store.state.user
        }
    },
}
</script>

<style>

</style>