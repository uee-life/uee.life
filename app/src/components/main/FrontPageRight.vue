<template>
    <div class="front-page-right" id="front-page-right">
        <latest-citizen />
    </div>
</template>

<script>
import LatestCitizen from '@/components/main/LatestCitizen.vue'

export default {
    name: "front-page-right",
    components: {
        LatestCitizen
    },
    data() {
        return {
        }
    }
}
</script>

<style>
    .front-page-right {
        width: 250px;
        min-width: 250px;
        padding: 10px;
    }
</style>