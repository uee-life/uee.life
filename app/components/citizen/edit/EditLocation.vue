<template>
  <div>
      Current Location: {{ current.system }} - {{ current.planet }} - {{ current.home }}<br>
      Selected Location: {{ system }} - {{ planet }} - {{ location }}
  </div>
</template>

<script>
export default {
    name: 'edit-location',
    props: ['current'],
    asyncData() {
        return {
            system: null,
            planet: null,
            location: null
        }
    }
}
</script>

<style>

</style>