import { getUserFromCookie, getUserFromLocalStorage } from '~/utils/auth'
import { strict } from 'assert';

export default function ({ store, req }) {
   // If nuxt generate, pass this middleware
  if (process.server && !req) return
  const loggedUser = process.server ? getUserFromCookie(req) : getUserFromLocalStorage()
  
  if(loggedUser) {
    store.dispatch('setUser', loggedUser['user'])
    store.dispatch('storeToken', { token: loggedUser['token'], expiry: loggedUser['token_expiry'] })
  }
}
