<template>
  <div class="tools">
      <h1>Coming Soon!</h1>
      <youtube title="Carrack Video" vid="5BBg3BTbcLo">
        This is a video of a Carrack doing things...
      </youtube>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Youtube from '@/components/layout/Youtube.vue'

export default {
  name: 'tools',
  components: {
    Youtube
  }
}
</script>

<style>

</style>