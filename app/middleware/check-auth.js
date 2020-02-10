import { getTokenFromCookie, getTokenFromLocalStorage } from '~/utils/auth'
import { subSeconds, isAfter } from 'date-fns'

export default function ({ store, req, redirect }) {
   // If nuxt generate, pass this middleware
  if (process.server && !req) return
  const data = process.server ? getTokenFromCookie(req) : getTokenFromLocalStorage()
  
  if(data) {
    let now = new Date()
    let expiry = new Date(data['token_expiry'])
    if (isAfter(now, expiry)) {
      console.log("Token expired. Needs new login.")
      return redirect('/auth/sign-off')
    } else if (isAfter(now, subSeconds(expiry, 1800))) {
      // refresh if token has 30 minutes or less to go...
      console.log("Token expires soon. Refreshing...")
      store.commit('REFRESH_TOKEN', true)
    } 
    store.dispatch('initUser', data)
  }
}
