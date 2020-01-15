import { getUserFromCookie, getUserFromLocalStorage } from '~/utils/auth'
import { strict } from 'assert';

export default function ({ isServer, store, req }) {
   // If nuxt generate, pass this middleware
  if (isServer && !req) return
  const loggedUser = isServer ? getUserFromCookie(req) : getUserFromLocalStorage()
  store.dispatch('setUser', loggedUser['user'])
  store.dispatch('storeToken', loggedUser['token'])
}
