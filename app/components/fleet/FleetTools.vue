<template>
    <main-panel v-if="canEdit" :title="title" class="tools">
        <input v-if="isAdmin || (canEdit && (!group.cmdr || citizen.info.handle.toLowerCase() !== group.cmdr.toLowerCase()))" class="tool-button" @click="removeGroup" type="button" value="Delete Group">
        <input v-if="isAdmin || (canEdit && (!group.cmdr || citizen.info.handle.toLowerCase() !== group.cmdr.toLowerCase()))" class="tool-button" @click="modals.edit = true" type="button" value="Edit Group">
        <input class="tool-button" @click="modals.group = true" type="button" value="Add Subgroup">
        <input class="tool-button" @click="modals.ship = true" type="button" value="Add Ship">
    </main-panel>
</template>

<script>
export default {
    props: {
        canEdit: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: ''
        }
    }
}
</script>

<style>

</style>