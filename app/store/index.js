
export const state = () => {
  return {
    user: null
  }
}

export const mutations = {
  SET_USER (state, user) {
    state.user = user || null
  }
}

export const actions = {
  setUser (state, auth0user, token) {
    const user = {
      username: auth0user.nickname,
      email: auth0user.email,
      email_verified: auth0user.email_verified,
      handle: auth0user['https://uee.life/app_metadata'].handle,
      handle_verified: auth0user['https://uee.life/app_metadata'].handle_verified,
      picture: auth0user.picture,
      token: token
    }
    commit('SET_USER', user)
  }
}

export const getters = {
  isAuthenticated (state) {
    return !!state.user
  },
  loggedUser (state) {
    return state.user
  }
}
