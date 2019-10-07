var currentGizmoRotation       = new x3dom.fields.SFMatrix4f();
var currentGizmoRotationOffset = new x3dom.fields.SFMatrix4f();

function processRotationGizmoEvent(event)
{		
    var sensorToWorldMatrix, rotationMatrixWorld;

    if (event.fieldName === 'rotation_changed')
    {
        //convert the sensor's output from sensor coordinates to world coordinates (i.e., include its 'axisRotation')
        sensorToWorldMatrix = x3dom.fields.SFMatrix4f.parseRotation(event.target.getAttribute("axisRotation"));			
        rotationMatrixWorld = sensorToWorldMatrix.mult(event.value.toMatrix());
        
        //create an offset that applies the current rotation in world coordinates,
        //but doesn't change the orientation of the coordinate system
        currentGizmoRotationOffset = rotationMatrixWorld.mult(sensorToWorldMatrix.inverse());			
        
        applyRotationGizmoTransformations();
    }

    if (event.fieldName === 'isActive' && event.value === false)
    {
        //incorporate the current rotation offset, interpreted globally, into the stored rotation value
        currentGizmoRotation = currentGizmoRotationOffset.mult(currentGizmoRotation);
        
        //reset current rotation offset to zero rotation
        currentGizmoRotationOffset = new x3dom.fields.SFMatrix4f();

        applyRotationGizmoTransformations();
    }
}

function applyRotationGizmoTransformations()
{
    var teapotRotationNode = document.getElementById('teapotRotation');
    
    //incorporate the current rotation offset, interpreted globally, into the stored rotation value
    var transformMatrix = currentGizmoRotationOffset.mult(currentGizmoRotation);
    
    //set matrix value in column major format, as required by the MatrixTransform node
    teapotRotationNode.setFieldValue("matrix", transformMatrix.transpose());
}

Vue.component('planet', {
    props: {
        test: {
            type: String,
            required: true,
            default: "Daymar"
        }
    },
    template: `
        <div>
            <div class="planet-info">
                <h3>Planet: {{ test }}</h3>
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
            xname: 'Daymar',
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
            return './images/textures/' + this.test + '.jpg'
        }
    }
});