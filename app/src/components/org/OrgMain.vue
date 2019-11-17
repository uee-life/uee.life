<template>
  <div class="org-main" id="org-main">
      <org-info :org="org"/>
  </div>
</template>

<script>
import OrgInfo from '@/components/org/OrgInfo.vue'

export default {
    name: 'org-main',
    props: ['org'],
    components: {
        OrgInfo
    }
}
</script>

<style>
    .org-main {
        width: 100%;
        padding-top: 10px;
    }
</style>