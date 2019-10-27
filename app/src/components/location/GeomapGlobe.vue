<template>
    <shape id='geomap-globe'>
        <appearance>
            <ImageTexture class="texture" :url="texture"></ImageTexture>
        </appearance>
        <sphere class="radius" :radius="location.msl"></sphere>
    </shape>
</template>

<script>
export default {
    name: "geomap-globe",
    props: ["location"],
    data() {
        return {
            /*location: {
                name: 'Yela',
                radius: 295
            }*/
        }
    },
    computed: {
        texture: function() {
            return "/images/textures/" + this.location.name + ".jpg"
        }
    }
}
</script>

<style>

</style>