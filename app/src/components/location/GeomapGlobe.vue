<template>
    <shape id='geomap-globe'>
        <appearance>
            <ImageTexture class="texture" :url="texture"></ImageTexture>
        </appearance>
        <sphere class="radius" :radius="radius"></sphere>
    </shape>
</template>

<script>
export default {
    name: "geomap-globe",
    data() {
        return {
            texture: 'https://robertsspaceindustries.com/media/qzf7kii1vu7k7r/source/Planet_Stanton3.jpg',
            radius: 295
        }
    }
}
</script>

<style>

</style>