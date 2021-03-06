// Global variables
var canvas;
var gl;

var program
var vBuffer;
var cBuffer;
var dropRate;//ms
var gameLevel;
var currentShape;
var currentGame;
var gameStatus;
var gameInprogress;
var score;

// Getting the keyboard input
window.addEventListener("keydown", getKey, false);
var pauseBtn = document.getElementById("pauseBtn");
var pressed = 0;
function restartGame() {
	gameOver();
	updateGameStatus("Restarting");
	setTimeout(() => {
		startGame();
	}, dropRate);
}
function rotateShape() {
	console.log("rotate");
	hideOverlay("top");
	currentShape.rotate();
	render(currentGame);
}
function shiftLeftOrRight(x) {
	if (x === 1) {
		hideOverlay("right");
	} else {
		hideOverlay("left");
	}
	currentShape.shiftByX(x);
	render(currentGame);
}
function speedUpShape() {
	hideOverlay("bottom");
	console.log("speedUp");
	dropCurrentShape(currentShape, currentGame);
	if (!currentShape.shape) {
		currentShape = new Shape(currentGame);
	}
	render(currentGame);
}
function dropToBottom() {
	hideOverlay("bottom");
	console.log("Drop to bottom");
	do {
		dropCurrentShape(currentShape, currentGame);
	} while (dropCurrentShape(currentShape, currentGame));

	if (!currentShape.shape) {
		currentShape = new Shape(currentGame);
	}
	render(currentGame);
}
function getKey(event) {
	if (event.code == "KeyQ") {
		gameOver();
	}
	if (event.code == "KeyR") {
		restartGame();
	}
	if (event.code == "KeyP") {
		pausOrResumeeGame();
	}
	if (!gameInprogress) {
		return;
	}
	if (event.code == "ArrowUp") {
		rotateShape();
	}
	if (event.code == "ArrowLeft") {
		shiftLeftOrRight(-1);
	}
	if (event.code == "ArrowRight") {
		shiftLeftOrRight(1);
	}
	if (event.code == "ArrowDown") {
		speedUpShape();
	}
	if (event.code == "Space") {
		dropToBottom();
	}
}
function initGameParam() {
	gameInprogress = true;
	dropRate = 1500;//ms
	gameLevel = 1;
	gameStatus = "Game In Progress";
	score = 0;
	document.getElementById("gameStatus").innerHTML = gameStatus;
	document.getElementById("score").innerHTML = score;
	document.getElementById("level").innerHTML = gameLevel;
}
function dropCurrentShape() {
	if (!gameInprogress) {
		return false;
	}
	if (!currentShape.shiftByY(1)) {//the shape can't move anymore
		var clearedRowNum = currentGame.checkCompleteRow();//either # of row cleared or -1 if shape stuck
		updateGameBoard(clearedRowNum);
		currentShape.die();
		return false;
	}
	return true;
}
function updateGameStatus(string) {
	document.getElementById("gameStatus").innerHTML = string;
}
function updateGameBoard(row) {
	var scoreEarned = 0;
	var newScore = 0;
	if (row > 0) {
		scoreEarned = row * 100 + (row - 1) * 50
		newScore = score + scoreEarned;
		if (Math.floor(newScore / 1000) > Math.floor(score / 1000)) {
			if (dropRate > 100) {// In Total 14 levels 
				dropRate -= 100;
			}
			console.log("new level");
			gameLevel++;
			document.getElementById("level").innerHTML = gameLevel;
		}
		score = newScore;
		document.getElementById("score").innerHTML = score;
	}
	switch (row) {
		case 1:
			updateGameStatus("One row cleared");
			break;
		case 2:
			updateGameStatus("Double Kill. Nice going");
			break;
		case 3:
			updateGameStatus("Triple Kill. Ohhh mahhh Gaaah");
			break;
		case 4:
			updateGameStatus("Quadra Kill. Nuibility!");
			break;
		default:
			break;
	}
}
function getGridVertices() {
	var gridVertices = [];
	var xStartingPoint = -100;
	var yStartingPoint = -200;
	var xStepSize = 20;
	var yStepSize = 20;
	for (i = 0; i < 10; i++) {
		var x = xStartingPoint + xStepSize * i;
		gridVertices.push(vec2(x, -200));
		gridVertices.push(vec2(x, 200));
	}
	for (i = 0; i < 20; i++) {
		var y = yStartingPoint + yStepSize * i;
		gridVertices.push(vec2(-200, y));
		gridVertices.push(vec2(200, y));
	}
	return gridVertices;
}

function randomColor() {
	var r = Math.round(Math.random() * 10) / 10;
	var g = Math.round(Math.random() * 10) / 10;
	var b = Math.round(Math.random() * 10) / 10;
	return vec4(r, g, b, 1.0);
}


window.onload = function init() {
	setMobileControls();
	canvas = document.getElementById("gl-canvas");

	gl = WebGLUtils.setupWebGL(canvas);
	if (!gl) { alert("WebGL isn't available"); }
	gl.viewport(0, 0, canvas.width, canvas.height);
	gl.clearColor(0.0, 0.0, 0.0, 1.0);

	// Creating the vertex buffer
	vBuffer = gl.createBuffer();

	// Creating the color buffer
	cBuffer = gl.createBuffer();

	gridBuffer = gl.createBuffer();

	//
	//  Load shaders and initialize attribute buffers
	//
	program = initShaders(gl, "vertex-shader", "fragment-shader");
	gl.useProgram(program);

	startGame();
};

function startGame() {
	initGameParam();
	pauseBtn.disabled = false;
	currentGame = new Game();
	currentShape = new Shape(currentGame);// a random shape

	render(currentGame);
	setTimeout(() => {
		mainLoop();
	}, dropRate);
}

function mainLoop() {
	if (!gameInprogress) {
		return;
	}
	pauseBtn.disabled = false;
	dropCurrentShape(currentShape, currentGame);
	if (!currentShape.shape) {
		currentShape = new Shape(currentGame);
		if (!currentShape.shape) {
			gameOver();
		}
	}
	render(currentGame);
	renderInterval = setTimeout(mainLoop
		, dropRate);
}
function gameOver() {
	currentGame.occupiedVertices = [];
	currentShape.shape = null;
	render(currentGame);
	gameInprogress = false;
	updateGameStatus("Game Over");
	pauseBtn.disabled = true;
}
function pausOrResumeeGame() {
	if (gameInprogress) {
		gameInprogress = false;
		updateGameStatus("Game paused");
		pauseBtn.innerHTML = "Resume";
	} else {
		gameInprogress = true;
		updateGameStatus("Game In Progress");
		pauseBtn.innerHTML = "Pause";
		mainLoop();
	}
}

function render(currentGame) {

	// Binding the vertex buffer

	gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
	var allColors = currentGame.getAllColor();
	gl.bufferData(gl.ARRAY_BUFFER, flatten(allColors), gl.STATIC_DRAW);
	var vColor = gl.getAttribLocation(program, "vColor");
	gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(vColor);

	gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
	var allBlocks = currentGame.getAllBlockVertices();
	gl.bufferData(gl.ARRAY_BUFFER, flatten(allBlocks), gl.STATIC_DRAW);
	var vPosition = gl.getAttribLocation(program, "vPosition");
	gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(vPosition);

	// Clearing the buffer and drawing the game
	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.drawArrays(gl.TRIANGLES, 0, allBlocks.length);
	// gl.drawArrays(gl.LINES, 0, 60);
	drawGrid();
	console.log("------------render cycle complete------------");

}
function drawGrid() {
	var vColor = gl.getAttribLocation(program, "vColor");
	gl.disableVertexAttribArray(vColor);
	gl.vertexAttrib4f(vColor, 0.6, 0.6, 0.6, 1);

	gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(getGridVertices()), gl.STATIC_DRAW);
	gl.drawArrays(gl.LINES, 0, 60);
}