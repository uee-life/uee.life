<template>
    <div id="right-dock" class="right-dock">
        <portal-target name="rightDock"></portal-target>
    </div>
</template>

<script>
export default {
    name: 'right-dock'
}
</script>

<style>
    .right-dock {
        width: fit-content;
        max-width: 230px;
        height: 100%;
        margin: 0px;
        padding: 10px;
        padding-left: 0px;
        position: relative;
    }
</style>