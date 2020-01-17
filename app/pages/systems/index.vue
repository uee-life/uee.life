<template>
  <div>
      <nuxt-link to="/systems/stanton">Stanton System</nuxt-link>
  </div>
</template>

<script>
export default {
  layout: "no-dock"

}
</script>

<style>
.layout-enter-active,
.layout-leave-active {
  transition-property: opacity;
  transition-timing-function: ease-in-out;
  transition-duration: 500ms;
}
.layout-enter,
.layout-leave-to {
  opacity: 0;
}
</style>