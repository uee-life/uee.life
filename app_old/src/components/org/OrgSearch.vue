<template>
    <div class="org-search">
        <left-dock :nav="false"/>
        <search-main />
        <right-dock />
    </div>
</template>

<script>
import SearchMain from '@/components/org/SearchMain.vue'
export default {
    name: 'org-search',
    components: {
        SearchMain
    }
}
</script>

<style>
    .org-search {
        width: 100%;
        display: flex;
    }
</style>