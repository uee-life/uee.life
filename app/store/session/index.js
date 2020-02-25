import axios from 'axios'
import Authenticator from '@/lib/Authenticator'

const auth = new Authenticator()

export const state = () => {
    return {
        authenticated: false,
        accessToken: null,
        idToken: null,
        expiresAt: null,
        user: null,
        citizen: null
    }
}

export const getters = {
  authenticated (state) {
    return state.authenticated
  },
  loggedUser (state) {
      return state.user
  }
}

export const mutations = {
  authenticated (state, authData) {
    state.authenticated = true
    state.accessToken = authData.accessToken
    state.idToken = authData.idToken
    state.expiresAt = authData.expiresIn * 1000 + new Date().getTime()

    localStorage.setItem('access_token', state.accessToken)
    localStorage.setItem('id_token', state.idToken)
    localStorage.setItem('token_expiry', state.expiresAt)
    this.$cookies.set('access_token', state.accessToken)
    this.$cookies.set('id_token', state.idToken)
    this.$cookies.set('token_expiry', state.expiresAt)
  },

  logout (state) {
    state.authenticated = false
    state.accessToken = null
    state.idToken = false
    state.expiresAt = null

    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('token_expiry')
    this.$cookies.remove('access_token')
    this.$cookies.remove('id_token')
    this.$cookies.remove('token_expiry')
    this.$cookies.remove('user')
  },

  SET_USER (state, user) {
      console.log('setting user')
      state.user = user
      this.$cookies.set('user', user)
  },

  SET_SESSION (state, data) {
    state.authenticated = !!data['access_token']
    state.accessToken = data['access_token']
    state.idToken = data['id_token']
    state.expiresAt = data['token_expiry']
  }
}

export const actions = {
    init ({state, commit}, data) {
        console.log('in init...')
        commit('SET_SESSION', data)
        commit('SET_USER', this.$cookies.get('user'))
    },

    login () {
        auth.login()
    },

    logout ({ commit }) {
        commit('logout')
    },

    async handleAuthentication ({ commit, state }) {
        const authResult = await auth.handleAuthentication()
        commit('authenticated', authResult)

        axios({
            url: 'https://api.uee.life/user',
            method: 'GET',
            headers: {
                Authorization: `Bearer ${state.accessToken}`
            }
        }).then((res) => {
            commit('SET_USER', res.data)
        }).catch((err) => {
            console.error('/user error (authenticated): ', err)
            commit('logout')
        })
    }
}
