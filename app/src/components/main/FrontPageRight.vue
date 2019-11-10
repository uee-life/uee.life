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
        width: 300px;
        min-width: 300px;
        margin: 10px;
        padding: 3px;
    }
</style>