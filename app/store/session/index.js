export const state = () => {
    return {
        user: null,
        token: null,
        token_expiry: null
    }
}

export const mutations = {
    SET_USER (state, user) {
        state.user = user || null
    },
    SET_TOKEN (state, token, expires) {
        //TODO: put the expiry computation code here?
        state.token = token || null
        state.token_expiry = expires || null
    }
}

export const actions = {
    setUser({ dispatch, commit }, auth0user) {
        if (auth0user) {
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
    storeToken({ commit }, token, expires) {
        if(token) {
            commit('SET_TOKEN', token, expires)
        }
    }
}