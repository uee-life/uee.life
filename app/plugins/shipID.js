import Vue from 'vue'

Vue.mixin({
    methods: {
        shipID: function (shipid) {
            return `UES-${ ('00' + shipid.toString(16).toUpperCase()).substr(-6) }`
        }
    }
})