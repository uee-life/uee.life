import Vue from 'vue'
import { mapGetters } from 'vuex'

Vue.mixin({
    computed: mapGetters(['needsRefresh']),
    mounted() {
        if(this.needsRefresh && (this.$router.currentRoute.path != '/auth/refresh')) {
            console.log('refreshing...')
            this.$router.push('/auth/refresh')
        }
    }
})