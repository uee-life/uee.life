export const strict = false

const initialState = () => ({
  isAdmin: false
})

export const state = initialState

export const getters = {
    isAdmin (state) {
      return state.isAdmin
    }
  }

export const mutations = {
  RESET (state) {
    const newState = initialState()
    Object.keys(newState).forEach(key => {
      state[key] = newState[key]
    })
  },
  SET_ADMIN (state, admin) {
    state.isAdmin = admin || null
  }
}

export const actions = {
  reset({ commit }) {
    commit('RESET')
  },
  setAdmin ({ commit }, admin) {
    commit('SET_ADMIN', admin)
  }
}

