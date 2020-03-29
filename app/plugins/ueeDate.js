import Vue from 'vue'
import { mapGetters } from 'vuex'

Vue.mixin({
    methods: {
        ueeDate(date) {
            const d = new Date(date);
            const year = d.getFullYear();
            const month = d.getMonth();
            const day = d.getDate();
            const ueeDate = new Date(year + 930, month, day).toDateString();
            return ueeDate
        }
    }
})


