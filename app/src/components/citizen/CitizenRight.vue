<template>
  <div class="citizen-right" id="citizen-right">
      <citizen-org :citizen="citizen"/>
      <citizen-links />
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
        width: 300px;
        min-width: 300px;
        margin: 10px;
        padding: 3px;
    }
</style>