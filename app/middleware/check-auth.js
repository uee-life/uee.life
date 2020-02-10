import { getTokenFromCookie, getTokenFromLocalStorage, unsetToken } from '~/utils/auth'
import { subSeconds, isAfter } from 'date-fns'

export default function (ctx) {
   // If nuxt generate, pass this middleware
   console.log('In check-auth.js')
  if (process.server && !ctx.req) return
  const data = process.server ? getTokenFromCookie(ctx.req) : getTokenFromLocalStorage()

  if(data) {
    let now = new Date()
    let expiry = new Date(data['token_expiry'])
    if (isAfter(now, expiry)) {
      console.log("Token expired. Needs new login.")
      console.log(ctx)
      unsetToken(ctx)
      return ctx.redirect('/auth/sign-off')
    } else if (isAfter(now, subSeconds(expiry, 1800))) {
      // refresh if token has 30 minutes or less to go...
      console.log("Token expires soon. Refreshing...")
      store.commit('REFRESH_TOKEN', true)
    } 
    return ctx.store.dispatch('initUser', data)
  }
}
