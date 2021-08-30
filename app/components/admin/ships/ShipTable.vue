<template>
    <vue-good-table class="ship-table"
        :columns="columns"
        :rows="ships"
        theme="black-rhino"
        :search-options="search"
        :pagination-options="pagination">
        <template slot="table-row" slot-scope="props">
            <span>
                {{props.formattedRow[props.column.field]}}
            </span>
        </template>
    </vue-good-table>
</template>

<script>
export default {
    name: 'ship-table',
    props: ["ships"],
    data() {
        return {
            columns: [
                {
                    label: 'Ship-ID',
                    field: 'id'
                },
                {
                    label: 'Maker',
                    field: 'make'
                },
                {
                    label: 'Model',
                    field: 'model'
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
                },
                {
                    label: 'Speed',
                    field: 'speed',
                    type: 'number'
                },
                {
                    label: 'Yaw',
                    field: 'yaw',
                    type: 'number'
                },
                {
                    label: 'Pitch',
                    field: 'pitch',
                    type: 'number'
                },
                {
                    label: 'Roll',
                    field: 'roll',
                    type: 'number'
                },
                {
                    label: 'Weapons',
                    field: 'weapon_slots'
                },
                {
                    label: 'Turrets',
                    field: 'turret_slots'
                },
                {
                    label: 'Missiles',
                    field: 'missile_slots'
                },
                {
                    label: 'Shields',
                    field: 'shield_slots'
                },
                {
                    label: 'Modifier',
                    field: 'modifier'
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