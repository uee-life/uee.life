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
        max-width: 240px;
        height: 100%;
        margin: 0px;
        padding: 10px;
        padding-top: 20px;
        position: relative;
    }
</style>