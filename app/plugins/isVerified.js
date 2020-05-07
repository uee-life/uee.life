import Vue from 'vue'
import { mapGetters } from 'vuex'

Vue.mixin({
    computed: {
        isVerified: function() {
            if (this.$auth.loggedIn && this.$auth.user && this.$auth.user.app_metadata.handle_verified) {
                return true
            }
            return false
        }
    }
})