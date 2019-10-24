<template>
  <div class="citizen-org" id="citizen-org">
      <img class="logo" :src="logo" />
      <div class="org-name">
        McBane Enterprises
      </div>
      <div class="org-title">
        Title: Director
      </div>
    <span class="corner top left"></span>
    <span class="corner top right"></span>
    <span class="corner bottom left"></span>
    <span class="corner bottom right"></span>
  </div>
</template>

<script>
export default {
  name: "citizen-org",
  data() {
    return {
      logo: "https://robertsspaceindustries.com/media/2weountodg09pr/heap_infobox/MCBANE-Logo.png"
    }
  }
}
</script>

<style>
  .citizen-org {
    display: flex;
    flex-direction: Column;
    justify-content: center;
    position: relative;
    padding: 15px;
    border: 1px solid grey;
    background: url('/images/fading-bars.png') repeat;
  }
  .logo {
    width: 165px;
    height: 165px; 
    align-self: center;
    margin: 10px;
  }
  .org-name {
    align-self: center;
    font-size: 20px;
  }
  .org-title {
    align-self: center;
    margin-bottom: 15px;
  }
</style>