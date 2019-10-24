<template>
  <div class="citizen-bio" id="citizen-bio">
      Bio:
      <div class="bio">
          Bio Text...
          <span class="corner top left"></span>
          <span class="corner top right"></span>
          <span class="corner bottom left"></span>
          <span class="corner bottom right"></span>
      </div>
        
  </div>
</template>

<script>
export default {
    name: "citizen-bio"
}
</script>

<style>
    .bio {
        display: block;
        position: relative;
        width: 100%;
        height: 200px;
        border: 1px solid grey;
        padding: 5px;
        background: url('/images/fading-bars.png') repeat;
        margin-bottom: 20px;
    }
</style>