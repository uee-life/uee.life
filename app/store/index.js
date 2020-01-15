import axios from 'axios'
import { WebAuth } from 'auth0-js'

const config = require('~/config.json')

export const state = () => {
  return {
    user: null,
    token: null,
    citizen: null,
  }
}

export const mutations = {
  SET_USER (state, user) {
    state.user = user || null
  },
  SET_TOKEN (state, token) {
    state.token = token || null
  },
  SET_CITIZEN (state, citizen) {
    state.citizen = citizen || null
  },
  SET_AUTH (state, auth) {
    state.auth = auth || null
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
        picture: auth0user.picture
      }

      return dispatch('getCitizen', user).then((user) => {
        commit('SET_USER', user)
      })
    }
  },
  storeToken({ commit }, token) {
    const config = require('~/config.json')
    if(token) {
      commit('SET_TOKEN', token)
    }
  },
  getCitizen({ commit }, user) {
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
  }
}
