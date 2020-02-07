import { getUserFromCookie, getUserFromLocalStorage } from '~/utils/auth'
import { subSeconds, isAfter, getMilliseconds } from 'date-fns'

export default function ({ store, req, redirect }) {
   // If nuxt generate, pass this middleware
  if (process.server && !req) return
  const loggedUser = process.server ? getUserFromCookie(req) : getUserFromLocalStorage()
  
  if(loggedUser) {
    store.dispatch('setUser', loggedUser['user'])
    store.dispatch('storeToken', { token: loggedUser['token'], expiry: loggedUser['token_expiry'] })

    let now = new Date()
    let expiry = new Date(loggedUser['token_expiry'])
    if (isAfter(now, expiry)) {
      console.log("Token expired. Needs new login.")
      return redirect('/auth/sign-off')
    } else if (isAfter(now, subSeconds(expiry, 1800))) {
      // refresh if token has 30 minutes or less to go...
      console.log("Token expired or about to expire. Refreshing...")
      store.commit('REFRESH_TOKEN', true)
    } 
  }
}
