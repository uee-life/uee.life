export const strict = false

const initialState = () => ({
  fleet: null
})

export const state = initialState

export const getters = {
    pageData (state) {
      return state.data
    }
  }

export const mutations = {
  RESET (state) {
    const newState = initialState()
    Object.keys(newState).forEach(key => {
      state[key] = newState[key]
    })
  },
  SET_DATA (state, data) {
    state.data = data || null
  }
}

export const actions = {
  reset({ commit }) {
    commit('RESET')
  },
  loadFleet({ commit }, fleetID) {
    
  },
  setPageData ({ commit }, data) {
    if(data){
      commit('SET_DATA', data)
    }
  }
}
