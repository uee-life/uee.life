<template>
  <div class="citizen-right" id="citizen-right">
      <citizen-org :citizen="citizen"/>
      <citizen-links :citizen="citizen"/>
  </div>
</template>

<script>
import CitizenOrg from '@/components/citizen/CitizenOrg.vue'
import CitizenLinks from '@/components/citizen/CitizenLinks.vue'

export default {
    name: "citizen-right",
    props: ["citizen"],
    components: {
        CitizenOrg,
        CitizenLinks
    }
}
</script>

<style scoped>
    .citizen-right {
        width: 220px;
        min-width: 220px;
        margin: 10px;
    }
</style>