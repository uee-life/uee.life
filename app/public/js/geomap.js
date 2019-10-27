function setTooltip(value) {
    tip = document.getElementById('ttip');
    tip.innerText = value;
    tip.style.visibility = "visible";
}
function clearTooltip() {
    tip = document.getElementById('ttip');
    tip.innerText = "";
    tip.style.visibility = "hidden";
}

var currentGizmoRotation       = new x3dom.fields.SFMatrix4f();
var currentGizmoRotationOffset = new x3dom.fields.SFMatrix4f();
var poi_db = {};
/*
* Callback function, invoked on rotation gizmo output.
*/
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


/*===[ map loading code ]==============================*/

function load_location(data){
    clear_all();
    console.log("Loading location: " + data['name']);
    add_globe(data['msl'], "/images/textures/" + data['name'] + ".jpg");
    init_markers();
    data['POIs'].forEach(element => {
        if(element) {
            addPOI(element);
        }
    });
}

function show_info(name) {
    info = document.getElementById("info");
    info.innerHTML = "";
    poi = poi_db[name];
    var tmpl = document.getElementById("info_template");
    n = tmpl.content.cloneNode(true);
    n.querySelector(".name").innerText = poi['name'];
    n.querySelector(".owner").innerText = poi['ownner'];
    n.querySelector(".type").innerText = poi['type'];
    n.querySelector(".alti").innerText = poi['altitude'];
    n.querySelector(".facilities").innerText = poi['facilities'];
    info.appendChild(n);
}

function add_globe(msl, texture){
    var tmpl = document.getElementById("globe_template");
    g = tmpl.content.cloneNode(true);
    g.querySelector(".texture").setAttribute("url", texture);
    g.querySelector(".radius").setAttribute("radius", msl);
    
    t = document.getElementById("globe");
    t.appendChild(g);
}

function init_markers() {
    m = document.getElementById('markers');
    m.appendChild(create_marker("OM1", "0 464.5 0", "1 0 0"));
    m.appendChild(create_marker("OM2", "0 -464.5 0", "0 0 1"));
    m.appendChild(create_marker("OM3", "-464.5 0 0", "0 0 1"));
    m.appendChild(create_marker("OM4", "464.5 0 0", "0 0 1"));
    m.appendChild(create_marker("OM5", "0 0 -464.5", "0 0 1"));
    m.appendChild(create_marker("OM6", "0 0 464.5", "0 0 1"));
}

function addTempMarker(coords) {
    if(document.getElementById("temp_marker")) {
        removeNode("Your_Location");
    }
    poi = create_marker("Your Location", buildTransform(coords), "0 1 0");
    p = document.getElementById('POIs');
    p.appendChild(poi);
}

function buildTransform(coords) {
    return coords['x'] + " " + coords['z'] + " " + coords['y']
}

function addPOI(data) {
    poi_db[data['name']] = data;
    var colors = {
        Shelter: "0 1 1",
        Mining: "0 1 1",
        Custom: "0.8 0.2 0.5",
        default: "0 1 1"
    }
    if(document.getElementById(data['name'])) {
        console.log("POI already exists: " + data['name']);
        return false;
    }
    console.log("Adding POI: " + data['name']);

    if(Object.keys(colors).includes(data['type'])) {
        color = colors[data['type']];
    } else {
        color = colors['default'];
    }

    poi = create_marker(data['name'], buildTransform(data['coords']), color)
    p = document.getElementById('POIs');
    p.appendChild(poi);
}

function removeNode(name) {
    n = document.getElementById(name);
    if(n){
        n.parentNode.removeChild(n);
    }
}

function create_marker(name, location, color) {
    var tmpl = document.getElementById('marker_template');
    marker = tmpl.content.cloneNode(true);
    id = name.split(" ").join("_");
    console.log("Marker id: " + id);
    marker.id = id;
    marker.querySelector(".transform").setAttribute("translation", location);
    marker.querySelector(".shape").setAttribute("onmouseover", "setTooltip('"+name+"')");
    marker.querySelector(".shape").setAttribute("onclick", "show_info('"+name+"')");
    marker.querySelector(".material").setAttribute("diffuseColor", color);
    return marker;
}

function clear_all() {
    document.getElementById('POIs').innerHTML = "";
    document.getElementById('markers').innerHTML = "";
    document.getElementById('globe').innerHTML = "";
    poi_db = {};
}