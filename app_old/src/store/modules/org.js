

const state = {
    orgID: ""
}

const getters = {
    getOrgID: () => {
        return state.orgID
    }
}

const actions = {
    doSomething(param) {
        this.commit('some_mutator', param)
    }
}

const mutations = {
    some_mutator(param) {
        state.orgID = param
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}