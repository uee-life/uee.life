

const state = {
    citizen: {}
}

const getters = {
    getCitizen: () => {
        return state.orgID
    }
}

const actions = {
    setCitizen(param) {
        this.commit('updateCitizen', param)
    }
}

const mutations = {
    updateCitizen(state, param ) {
        state.citizen.handle = param
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}