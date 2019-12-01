<template>
    <div>
    <div>
      <img :src="$auth.user.picture">
      <h2>{{ $auth.user["https://uee.life/user_metadata"].handle }}</h2>
      <p>{{ $auth.user.email }}</p>
    </div>

    <div>
      <pre>{{ JSON.stringify($auth.user, null, 2) }}</pre>
    </div>
  </div>
</template>

<script>
export default {
    name: "profile"
}
</script>

<style>

</style>