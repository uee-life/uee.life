import { getUserFromCookie, getUserFromLocalStorage, getToken } from '~/utils/auth'

export default function ({ isServer, store, req }) {
   // If nuxt generate, pass this middleware
  if (isServer && !req) return
  const loggedUser = isServer ? getUserFromCookie(req) : getUserFromLocalStorage()
  const token = getToken(req)
  store.dispatch('setUser', loggedUser, token)
}
