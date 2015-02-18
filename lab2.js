//Evan Canull 2/17/2015
var canvas;
var gl;
var xPos = 0.0;
var yPos = 0.0;
var modelViewMatrix;
var uModelViewMatrix; 
var verticesColors = new Float32Array([
	// Vertex points
	-0.5, 0.0, 1.0, 0.0, 0.0,
	0.0, -0.5, 0.0, 1.0, 0.0,
	0.0, -0.5, 0.0, 0.0, 1.0,
	0.5, 0.0, 1.0, 0.0, 0.0,
	0.0, 0.5, 0.0, 1.0, 0.0,
	0.0, 0.5, 0.0, 0.0, 1.0
	]);

function handleKeyDown(ev){
	//Uses the ASCII Values of ASWD and 1
	if (ev.keyCode == 65){ 
		xPos -= 0.1;
	}
	if (ev.keyCode == 68){
		xPos += 0.1;		
	}
	if (ev.keyCode == 87){
		yPos += 0.1;
	}
	if (ev.keyCode == 83){
		yPos -= 0.1;
	}
	if (ev.keyCode == 49){ 
		xPos = 0;
		yPos = 0;
	}
}

window.onload = function init()
{
var canvas = document.getElementById( "gl-canvas" );
gl = WebGLUtils.setupWebGL( canvas );
if ( !gl ) { alert( "WebGL isn't available" ); }
// Configure WebGL
gl.viewport( 0, 0, canvas.width, canvas.height );
gl.clearColor( 0.0, 0.0, 0.0, 1.0 );

document.onkeydown=handleKeyDown;
// Load shaders and initialize attribute buffers
var program = initShaders( gl, "vertex-shader", "fragment-shader" );
gl.useProgram( program );
gl.program = program;

var vertexColorBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);
gl.bufferData(gl.ARRAY_BUFFER, verticesColors, gl.STATIC_DRAW);

var FSIZE = verticesColors.BYTES_PER_ELEMENT;

var vPosition = gl.getAttribLocation(program, 'vPosition');
gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, FSIZE*5, 0);
gl.enableVertexAttribArray(vPosition);

var aColor = gl.getAttribLocation(program, 'aColor');
gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, FSIZE*5, FSIZE*2);
gl.enableVertexAttribArray(aColor);

uModelViewMatrix = gl.getUniformLocation(program, 'uModelViewMatrix');
modelViewMatrix = mat4();

render();	
};

var render = function(){
	gl.clearColor(0.0,0.0,0.0,1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);
	modelViewMatrix = translate(xPos, yPos, 0);
	gl.uniformMatrix4fv(uModelViewMatrix, false, flatten(modelViewMatrix));
	gl.drawArrays(gl.TRIANGLE_FAN, 0, 6);
	window.requestAnimFrame(render);
};
