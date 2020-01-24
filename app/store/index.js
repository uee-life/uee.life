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
  loadUser ({ dispatch, commit }, req) {
    if (process.server && !req) return
    const loggedUser = process.server ? getUserFromCookie(req) : getUserFromLocalStorage()

    if(loggedUser) {
      dispatch('setUser', loggedUser['user'])
      dispatch('storeToken', { token: loggedUser['token'], expiry: loggedUser['token_expiry']})

      let now = new Date()
      let expiry = new Date(loggedUser['token_expiry'])
      if (isAfter(now, subSeconds(expiry, 600))) {
        console.log("Token expired or about to expire. Refreshing...")
        commit('REFRESH_TOKEN', true)
      } 
    }
  },
  setUser ({ dispatch, commit }, auth0user) {
    console.log(auth0user)
    let handle = ''
    let handle_verified = ''
    if(auth0user.app_metadata) {
      handle = auth0user.app_metadata.handle
      handle_verified = auth0user.app_metadata.handle_verified
    } else {
      handle = auth0user['https://uee.life/app_metadata'].handle
      handle_verified = auth0user['https://uee.life/app_metadata'].handle_verified
    }
    if(auth0user){
      const user = {
        username: auth0user.nickname,
        email: auth0user.email,
        email_verified: auth0user.email_verified,
        handle: handle,
        handle_verified: handle_verified,
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
  },
  needsRefresh (state) {
    return state.refresh
  }
}
