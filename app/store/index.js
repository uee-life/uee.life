import axios from 'axios'

export const state = () => {
  return {
    user: null,
    token: null,
    expires: null,
    citizen: null,
    isMobile: false,
    saving: false
  }
}

export const mutations = {
  SET_USER (state, user) {
    state.user = user || null
  },
  SET_TOKEN (state, token) {
    state.token = token || null
  },
  SET_EXPIRY (state, expires) {
    state.expires = expires || null
  },
  SET_CITIZEN (state, citizen) {
    state.citizen = citizen || null
  },
  SET_MOBILE (state, isMobile) {
    state.isMobile = isMobile || false
  },
  SET_SAVING (state, isSaving) {
    state.saving = isSaving || false
  }
}

export const actions = {
  setUser ({ dispatch, commit }, auth0user) {
    if(auth0user){
      const user = {
        username: auth0user.nickname,
        email: auth0user.email,
        email_verified: auth0user.email_verified,
        handle: auth0user['https://uee.life/app_metadata'].handle,
        handle_verified: auth0user['https://uee.life/app_metadata'].handle_verified,
        picture: auth0user.picture,
        verificationCode: auth0user.verificationCode ? auth0user.verificationCode : null
      }

      return dispatch('loadCitizen', user).then((user) => {
        commit('SET_USER', user)
      })
    }
  },
  storeToken({ commit }, { token, expiry }) {
    console.log('storeToken')
    console.log(token)
    console.log(expiry)
    if(token && expiry) {
      commit('SET_TOKEN', token)
      commit('SET_EXPIRY', expiry)
    }
  },
  loadCitizen({ commit }, user) {
    console.log(user.handle)
    axios({
      url: `https://api.uee.life/citizen/${user.handle}`,
      method: 'GET'
    }).then((res) => {
        commit('SET_CITIZEN', res.data)
    }).catch((err) => {
        //eslint-disable-next-line
        console.error(err)
    })
    return user
  },
  setCitizen({ commit }, citizen) {
    commit('SET_CITIZEN', citizen)
  }
}

export const getters = {
  isAuthenticated (state) {
    return !!state.user
  },
  loggedUser (state) {
    return state.user
  },
  loggedCitizen (state) {
    return state.citizen
  },
  accessToken (state) {
    return state.token
  },
  isMobile (state) {
    return state.isMobile
  },
  isSaving (state) {
    return state.isSaving
  }
}
