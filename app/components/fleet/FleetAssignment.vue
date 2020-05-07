<template>
    <main-panel title="Assignment" class="assignment">
        <template v-if="assignment">
            <div class="line-item"><span class="label">Group:</span><span class="value">{{assignment.group.name}}</span></div>
            <div class="line-item"><span class="label">Ship:</span><span class="value">{{ shipID(assignment.ship) }}</span></div>
            <div class="line-item"><span class="label">Role:</span><span class="value">{{ assignment.role }}</span></div>
        </template>
        <template v-else>
            Not yet assigned
        </template>
    </main-panel>
</template>

<script>
export default {
    name: "FleetAssignment",
    props: ["assignment"]
}
</script>

<style>
.assignment {
    margin: 10px;
}
.assignment .line-item {
    display: flex;
    margin: 0 10px;
}
.assignment .line-item .label {
    width: 50px;
}
.assignment .line-item .value {
    color: #dbf3ff;
}
</style>