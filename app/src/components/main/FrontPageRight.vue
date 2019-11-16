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
        width: 220px;
        min-width: 220px;
        margin: 10px;
        padding: 0;
    }
</style>