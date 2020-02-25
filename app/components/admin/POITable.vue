<template>
    <!--vue-good-table v-if="pois" class="poi-table"
        :columns="columns"
        :rows="pois"
        theme="black-rhino"
        :search-options="search"
        :pagination-options="pagination">
    </vue-good-table -->
    <table>
        <tr><th v-for="col in columns" :key="col.field">{{ col.label }}</th></tr>
        <tr v-for="poi in pois" :key="poi.id">
            <td>{{ poi.id }}</td>
            <td>{{ poi.name }}</td>
            <td>{{ poi.code }}</td>
            <td>{{ poi.type }}</td>
            <td>{{ poi.subtype }}</td>
            <td>{{ poi.parent }}</td>
            <td>{{ poi.system }}</td>
            <td>{{ poi.custom }}</td>
        </tr>
    </table>
</template>

<script>
export default {
    name: 'PoiTable',
    props: ["pois"],
    data() {
        return {
            columns: [
                { label: 'id', field: 'id' },
                { label: 'Name', field: 'name' },
                { label: 'Code', field: 'code' },
                { label: 'type', field: 'type' },
                { label: 'subtype', field: 'subtype' },
                { label: 'parent', field: 'parent' },
                { label: 'system', field: 'system' },
                { label: 'custom', field: 'custom', type: 'number' },
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

    td {
        border: 1px solid gray;
    }
</style>