<template>
    <vue-good-table class="ship-table"
        :columns="columns"
        :rows="ships"
        theme="black-rhino"
        :search-options="search"
        :pagination-options="pagination" />
</template>

<script>
export default {
    name: 'ship-table',
    props: ["ships"],
    data() {
        return {
            columns: [
                {
                    label: 'Manufacturer',
                    field: 'make'
                },
                {
                    label: 'Model',
                    field: 'model'
                },
                {
                    label: 'Name',
                    field: 'name'
                },
                {
                    label: 'Role',
                    field: 'type'
                },
                {
                    label: 'Focus',
                    field: 'focus'
                },
                {
                    label: 'Crew',
                    field: 'max_crew',
                    type: 'number'
                },
                {
                    label: 'Cargo',
                    field: 'cargo',
                    type: 'number'
                }
            ],
            search: {
                enabled: false,
                
            },
            pagination: {
                enabled: true,
                position: 'top'
            }
        }
    }
}
</script>

<style>
    .ship-table {
        width: 100%;
    }
</style>