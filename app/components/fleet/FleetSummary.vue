<template>
    <div class="fleet-summary">
        <main-panel title="Summary">
            Fleet Summary
        </main-panel>
    </div>
</template>

<script>
export default {
    name: "FleetSummary",
    props: {
        fleet: {
            type: Array,
            default: function () {
                return []
            }
        }
    }
}
</script>

<style>

</style>