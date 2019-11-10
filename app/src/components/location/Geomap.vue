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
                            <geomap-globe :location="location" />
                        </transform>
                    </group>
                    <transform id="markers" translation="0 0 0">
                        <geomap-marker v-for="marker in markers" :key="marker.name" :marker="marker" />
                    </transform>

                    <transform id="POIs" translation="0 0 0">
                        <geomap-marker v-for="p in location.POIs" :key="p.name" :marker="p" />
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
    props: ["location"],
    components: {
        GeomapGlobe,
        GeomapMarker
    },
    data() {
        return {
            markers: [
                {name: "OM1",type: 'marker', coords:{"x":0,"y":464.5,"z":0}},
                {name: "OM2",type: 'marker', coords:{"x":0,"y":-464.5,"z":0}},
                {name: "OM3",type: 'marker', coords:{"x":-464.5,"y":0,"z":0}},
                {name: "OM4",type: 'marker', coords:{"x":464.5,"y":0,"z":0}},
                {name: "OM5",type: 'marker', coords:{"x":0,"y":0,"z":-464.5}},
                {name: "OM6",type: 'marker', coords:{"x":0,"y":0,"z":464.5}}
            ]
        }
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
    .ttip {
        position: absolute;
        top: 5px;
        left: 10px;
    }
</style>