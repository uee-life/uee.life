<template>
    <div class="geomap" id="geomap">
        <x3d id="x3d" class="x3d" width='600px' height='600px'>
            <scene> 
                <navigationInfo type="none"></navigationInfo>
                <viewpoint id="start" position="0 140 1150" orientation="-1 0 0 0.104"></viewpoint>
                <directionalLight id="directional" direction='-1 -0.4 -0.6' on ="TRUE" intensity='4.0' shadowIntensity='0.1'></directionalLight>
                <matrixTransform id="teapotRotation">
                    <group>
                        <cylinderSensor autoOffset='false' axisRotation='0 1 0 -1.57' onoutputchange='processRotationGizmoEvent(event);'></cylinderSensor>
    
                        <transform id="globe" translation="0 0 0">
                            <geomap-globe />
                        </transform>
                    </group>
                    <transform id="markers" translation="0 0 0">
                        <geomap-marker v-for="marker in markers" :key="marker.name" :marker="marker" />
                        <geomap-marker v-for="p in POIs" :key="p.name" :marker="marker" />
                    </transform>

                    <transform id="POIs" translation="0 0 0">

                    </transform>
                </matrixTransform>
            </scene>
        </x3d>
        <span class="corner top left"></span>
        <span class="corner top right"></span>
        <span class="corner bottom left"></span>
        <span class="corner bottom right"></span>
        <div id="ttip" class="ttip">tooltip</div>
    </div>
</template>

<script>
import GeomapGlobe from '@/components/location/GeomapGlobe.vue'
import GeomapMarker from '@/components/location/GeomapMarker.vue'

export default {
    name: "geomap",
    components: {
        GeomapGlobe,
        GeomapMarker
    },
    data() {
        return {
            markers: [
                {
                    name: "OM1",
                    location: '0 464.5 0',
                    colour: '1 0 0'
                },
                {
                    name: "OM2",
                    location: '0 -464.5 0',
                    colour: '0 0 1'
                },
                {
                    name: "OM3",
                    location: '-464.5 0 0',
                    colour: '0 0 1'
                },
                {
                    name: "OM4",
                    location: '464.5 0 0',
                    colour: '0 0 1'
                },
                {
                    name: "OM5",
                    location: '0 0 -464.5',
                    colour: '0 0 1'
                },
                {
                    name: "OM6",
                    location: '0 0 464.5',
                    colour: '0 0 1'
                }
            ],
            POIs: [
                {"name": "Wolf Point", "type": "Shelter", "coords": {"x":276.443536,"y":-9.384236,"z":103.100625}},
                {"name": 'Eager Flats', "type": "Shelter", "coords": {"x":105.271803, "y":-199.087723, "z":188.641219}},
                {"name": 'Shubin SCD-1', "type": "Mining", "coords": {"x":133.25458, "y":-203.51641, "z":164.012811}},
                {"name": 'Kudre Ore', "type": "Mining", "coords": {"y": -143.955328, "x": 177.82615699999997, "z": -185.964455}},
                {"name": 'Daymar Cave', "type": "Custom", "coords": {"y": -108.443219, "x": -245.121636, "z": 122.39169300000003}},
                {"name": "Bountiful Harvest", "type": "Hydroponics", "coords": {"y": -56.248283000000015, "x": 93.241222, "z": -274.020436}}
            ]
        }
    },
    mounted() {
        const x3d = document.createElement("script");
        x3d.setAttribute("src", '//www.x3dom.org/download/x3dom.js');
        x3d.async = true;
        document.head.appendChild(x3d);
    }
}
</script>

<style>
    .geomap {
        position: relative;
        border: 1px solid grey;
        width: 610px;
        height: 610px;
        margin: 10px;
    }
    .x3d {
        height: 600px;
        width: 600px;
        margin: 5px;
    }
</style>