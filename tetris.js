// Global variables
var canvas;
var gl;

var program
var vBuffer;
var dropSpeed = 1500;//ms
var stackedBlocks = [];

// Getting the keyboard input
window.addEventListener("keydown", getKey, false);
var pressed = 0;
function getKey(key) {

	if (key.key == "ArrowUp") {
		console.log("rotate");
		currentShape.rotate();
		render(currentShape);
	}
	if (key.key == "ArrowLeft") {
		console.log("left");
		currentShape.shift([-20, 0]);
		render(currentShape);
	}
	if (key.key == "ArrowRight") {
		console.log("right");
		currentShape.shift([20, 0]);
		render(currentShape);
	}
	if (key.key == "ArrowDown") {
		console.log("speedUp");
		currentShape.shift([0, -20]);
		render(currentShape);
	}
}


function getGridVertices(){
	var gridVertices = [];
	var xStartingPoint = -100;
	var yStartingPoint = -200;
	var xStepSize = 20;
	var yStepSize = 20;
	for(i = 0; i < 10; i ++){
		var x = xStartingPoint + xStepSize * i;
		gridVertices.push(vec2(x, -200));
		gridVertices.push(vec2(x, 200));
	}
	for(i = 0; i < 20; i++){
		var y = yStartingPoint + yStepSize * i;
		gridVertices.push(vec2(-200, y));
		gridVertices.push(vec2(200, y));
	}
	return gridVertices;
}

function drawGrid(){
	gl.bufferData(gl.ARRAY_BUFFER, flatten(getGridVertices()), gl.STATIC_DRAW);
	gl.drawArrays(gl.LINES, 0, 60);
}

function randomColor(){
	var r = Math.random();
	var g = Math.random();
	var b = Math.random();
	return vec4(r, g, b, 1.0);
}

var currentShape;
window.onload = function init() {

	canvas = document.getElementById("gl-canvas");

	gl = WebGLUtils.setupWebGL(canvas);
	if (!gl) { alert("WebGL isn't available"); }
	gl.viewport(0, 0, canvas.width, canvas.height);
	gl.clearColor(0.0, 0.0, 0.0, 1.0);

	// Creating the vertex buffer
	vBuffer = gl.createBuffer();

	//
	//  Load shaders and initialize attribute buffers
	//
	program = initShaders(gl, "vertex-shader", "fragment-shader");
	gl.useProgram(program);

	currentShape = new Shape();// a random shape

	currentShape.shift([0, 40]);

	mainLoop();
};

function mainLoop() {
	currentShape.shift([0, -20]);
	render(currentShape);

	setTimeout(() => {
		window.requestAnimFrame(mainLoop);
	}, dropSpeed);
}

function render(currentShape) {

	// Binding the vertex buffer
	gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);

	var allBlocks = [];
	currentShape.getAllBlocks().forEach(block => {
		block.forEach((v) => {
			allBlocks.push(v);
		});
	});
	gl.bufferData(gl.ARRAY_BUFFER, flatten(allBlocks), gl.STATIC_DRAW);

	// Associate out shader variables with our data buffer
	var vPosition = gl.getAttribLocation(program, "vPosition");
	var color = gl.getAttribLocation(program, "color");
	gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(vPosition);
	// gl.vertexAttribPointer(color, 2, gl.FLOAT, false, 0, 0);
	// gl.enableVertexAttribArray(color);

	// Clearing the buffer and drawing the square
	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.drawArrays(gl.TRIANGLES, 0, allBlocks.length);

	drawGrid();

}
