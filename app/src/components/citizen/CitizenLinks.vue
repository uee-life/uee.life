<template>
  <div class="citizen-links" id="citizen-links">
    External Links
    <ul>
        <li>Web: <a href="https://capnflint.com">capnflint.com</a></li>
        <li>Twitter: <a href="https://twitter.com/Capn_Flint">@Capn_Flint</a></li>
    </ul>
    <span class="corner top left"></span>
    <span class="corner top right"></span>
    <span class="corner bottom left"></span>
    <span class="corner bottom right"></span>
  </div>
</template>

<script>
export default {
  name: "citizen-links"
}
</script>

<style>
  .citizen-links {
    display: flex;
    flex-direction: Column;
    justify-content: center;
    position: relative;
    padding: 15px;
    border: 1px solid grey;
    margin-top: 20px;
    background: url('/images/fading-bars.png') repeat;
  }
</style>