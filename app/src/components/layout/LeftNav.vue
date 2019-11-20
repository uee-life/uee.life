<template>
  <dock-item title="NAV" mainClass="left-nav">
    <portal-target name="navigationPane"></portal-target>
  </dock-item>
</template>

<script>
export default {
  name: "left-nav",
  //props: ["links"],
}
</script>

<style>
    .left-nav .content {
      opacity: 1;
    }

    .left-nav-button::before {
      content: "> "
    }
    .left-nav-button {
        margin-left: 10px;
        margin-right: 10px;
    }
    .left-nav-button a {
      text-decoration: none;
      color: #39ced8;
    }
</style>