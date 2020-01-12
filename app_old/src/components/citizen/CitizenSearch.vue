<template>
    <div class="citizen-search">
        <left-dock :nav="false"/>
        <citizen-results />
        <right-dock />
    </div>
</template>

<script>
import CitizenResults from '@/components/citizen/CitizenResults.vue'
export default {
    name: 'citizen-search',
    components: {
        CitizenResults
    }
}
</script>

<style>
    .citizen-search {
        width: 100%;
        display: flex;
    }
</style>