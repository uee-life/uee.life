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

