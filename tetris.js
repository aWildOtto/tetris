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
	gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(vPosition);

	// Clearing the buffer and drawing the square
	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.drawArrays(gl.TRIANGLES, 0, allBlocks.length);

}
