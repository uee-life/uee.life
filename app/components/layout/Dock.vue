<template>
  <div class="dock">
    <portal-target :name="name"></portal-target>
  </div>
</template>

<script>

export default {
  name: 'dock',
  props: {
        name: {
            type: String,
            required: true
        }
  }
}
</script>

<style>
    .dock {
        width: fit-content;
        margin: 0 10px;
        position: relative;
    }
</style>