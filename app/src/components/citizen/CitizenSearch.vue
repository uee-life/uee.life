<template>
    <div class="citizen-search">
        <left-dock :nav="false"/>
        <search-main />
        <right-dock />
    </div>
</template>

<script>
import SearchMain from '@/components/citizen/SearchMain.vue'
export default {
    name: 'citizen-search',
    components: {
        SearchMain
    }
}
</script>

<style>
    .citizen-search {
        width: 100%;
        display: flex;
    }
</style>