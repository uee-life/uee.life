<template>
    <transform id="geomap-marker" class="transform" :translation='location'>
        <shape class="shape" :onmouseover="tooltip" onmouseout="clearTooltip()"> 			
            <appearance> 
                <material class="material" :diffuseColor='color'></material> 
            </appearance> 
            <sphere radius="10"></sphere>
        </shape>
    </transform>
</template>

<script>
export default {
    name: 'geomap-marker',
    props: ["marker"],
    computed: {
        tooltip: function() {
            return "setTooltip('" + this.marker.name + "')"
        },
        location: function() {
            if(this.marker.type == "marker") {
                return this.marker.coords.x + " " + this.marker.coords.y + " " + this.marker.coords.z
            } else {
                return this.marker.coords.x + " " + this.marker.coords.z + " " + this.marker.coords.y
            }
            
        },
        color: function() {
            let color = "1 1 1"
            const colors = {
                north: "1 0 0",
                marker: "0 0 1",
                Shelter: "0 1 1",
                Mining: "0 1 1",
                Custom: "0.8 0.2 0.5",
                default: "0 1 1"
            }
            if(Object.keys(colors).includes(this.marker.type)) {
                color = colors[this.marker.type];
            } else {
                color = colors['default'];
            }
            return color;
        }
    }
}
</script>

<style>

</style>