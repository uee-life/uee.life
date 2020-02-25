import axios from 'axios'
import { getUserFromCookie, getUserFromLocalStorage } from '~/utils/auth'
import { subSeconds, isAfter } from 'date-fns'

export const state = () => {
  return {
    user: null,
    token: null,
    expires: null,
    refresh: false,
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
  REFRESH_TOKEN (state, refresh) {
    state.refresh = refresh || false
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
  initUser ({ commit, dispatch }, data) {

    dispatch('setToken', { token: data['token'], expiry: data['token_expiry']})

    return axios({
      url: 'https://api.uee.life/user',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${data['token']}`
      }
    }).then((res) => {
      commit('SET_USER', res.data)
    }).catch((error) => {
      console.error('/user error (store): ', error)
      window.localStorage.removeItem('token')
      window.localStorage.removeItem('access_token')
      window.localStorage.removeItem('access_token_expiry')
      window.localStorage.removeItem('user')
      window.localStorage.removeItem('secret')
      this.$cookies.remove('jwt')
      this.$cookies.remove('jwt_expires')
      window.localStorage.setItem('logout', Date.now())
    })
  },

  setUser ({ commit }, data) {
    if(data){
      commit('SET_USER', data)
    }
  },

  setToken({ commit }, { token, expiry }) {
    console.log('storeToken')
    if(token && expiry) {
      commit('SET_TOKEN', token)
      commit('SET_EXPIRY', expiry)
    }
  },

  loadCitizen({ commit }, user) {
    console.log(user.handle)
    axios({
      url: `https://api.uee.life/citizens/${user.handle}`,
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
  },
  needsRefresh (state) {
    return state.refresh
  }
}
