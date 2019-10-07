var apiURL = 'https://www.capnflint.com:4443'

Vue.component('org', {
    template: `
        <div class="org">
            <img class="org-banner" :src="banner">
            <img class="org-logo" :src="logo">
            <div class="org-name">{{name}}</div>
            <div class="members">Members: {{count}}</div>
            <div class="bio" v-html="bio"></div>
        </div>
    `,
    data() {
        return {
            logo: 'https://robertsspaceindustries.com/media/2weountodg09pr/logo/MCBANE-Logo.png',
            banner: 'https://robertsspaceindustries.com/media/4mnm79mcq45gwr/banner/MCBANE-Banner.jpg',
            count: 80,
            name: 'McBane Enterprises',
            bioText: 'McBane enterprises. We aim to misbehave.\nGet a crew, get a job, keep flying.\nFor Science!\nhttp://twitch.tv/Capn_Flint\n'
        }
    },
    computed: {
        bio() {
            return this.bioText.split('\n').join('<br/>');
        }
    }
});

Vue.component('planet', {
    template: `
        <div>
            <div class="planet-info">
                <h3>Planet: {{ name }}</h3>
            </div>
            <div id="map" class="map">
                <x3d id="x3d" width='600px' height='600px'> 
                    <scene> 
                        <navigationInfo type="none"></navigationInfo>
                        <viewpoint id="start" position="0 140 1150" orientation="-1 0 0 0.104"></viewpoint>
                        <directionalLight id="directional" direction='-1 -0.4 -0.6' on ="TRUE" intensity='4.0' shadowIntensity='0.1'></directionalLight>
                        <matrixTransform id="teapotRotation">
                            <group>
                                <!-- The main globe -->
                                <cylinderSensor autoOffset='false' axisRotation='0 1 0 -1.57' onoutputchange='processRotationGizmoEvent(event);'></cylinderSensor>
            
                                <transform id="globe" translation="0 0 0">
                                    <shape>
                                        <appearance>
                                            <ImageTexture class="texture" :url="texture"></ImageTexture>
                                        </appearance>
                                        <sphere class="radius" :radius="radius"></sphere>
                                    </shape>
                                </transform>
                            </group>
                            <transform id="markers" translation="0 0 0">
        
                            </transform>
        
                            <transform id="POIs" translation="0 0 0">
        
                            </transform>
                        </matrixTransform>
                    </scene>
                </x3d> 
            </div>
            <ul class="info">
                <li v-for="(detail, key) in details">{{ key }}: {{ detail }}</li>
            </ul>
        </div>
    `,
    data() {
        return {
            name: 'Daymar',
            link: 'https://www.google.com',
            details: {
                Name: "Daymar",
                Owner: "UEE",
                Type: "Planet"
            },
            radius: 295
        }
    },
    methods: {
        getData: function(location) {
            var xhr = new XMLHttpRequest()
            var self = this
            var data = {
                location: location
            }
            xhr.open('POST', apiURL + '/stargps/location')
            xhr.onload = function() {
                self.data = JSON.parse(xhr.responseText)
                console.log(self.data)
            }
        },
        loadLocation(data) {

        }
    },
    computed: {
        texture() {
            return './images/textures/' + this.name + '.jpg'
        }
    }
});

var app = new Vue({
    el: '#app'
});