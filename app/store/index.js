import Vue from 'vue'
import Vuex from 'vuex'
import org from './modules/org'
import citizen from './modules/citizen'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        org,
        citizen
    }
})