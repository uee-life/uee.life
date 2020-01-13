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
        max-width: 240px;
        height: 100%;
        margin: 0px;
        padding: 10px;
        padding-top: 20px;
        position: relative;
    }
</style>