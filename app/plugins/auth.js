export default function ({ $auth }) {
    $auth.onError((error, name, endpoint) => {
        console.error(name, error)
    })

    if (!$auth.loggedIn) {
      return
    }
  
    const username = $auth.user.username
}