import jwtDecode from "jwt-decode"

export default function ({ $auth, store }) {
    $auth.onError((error, name, endpoint) => {
        console.error(name, error)
    })

    if (!$auth.loggedIn) {
      return
    }

    // copy metadata to make it easier to reference
    $auth.user.app_metadata = $auth.user['https://uee.life/app_metadata']
    $auth.user.user_metadata = $auth.user['https://uee.life/user_metadata']

    if(process.browser) {
      // apply permissions to scope
      $auth.user.scope = jwtDecode(localStorage.getItem('auth._token.auth0').substr(7)).permissions
      store.dispatch('loadCitizen', $auth.user)
    } else {
      $auth.user.scope = []
    }
}