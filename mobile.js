//controls on mobile devices

function setMobileControls() {
	var top = document.getElementById('top-overlay');
	var hammer = new Hammer(top, { domEvents: true });
	hammer.on('tap', (event) => {
		if (!gameInprogress) {
			return;
		}
		hideOverlay("top");
		// console.log(event);
		console.log("rotate");
		currentShape.rotate();
		render(currentGame);
	});

	var left = document.getElementById('left-overlay');
	var hammer2 = new Hammer(left, { domEvents: true });
	hammer2.on('tap', (event) => {
		if (!gameInprogress) {
			return;
		}
		event.srcEvent.stopPropagation();
		hideOverlay("left");
		// console.log(event);
		console.log("left");
		currentShape.shiftByX(-1);
		render(currentGame);
	});

	var right = document.getElementById('right-overlay');
	var hammer3 = new Hammer(right, { domEvents: true });
	hammer3.on('tap', (event) => {
		if (!gameInprogress) {
			return;
		}
		event.srcEvent.stopPropagation();
		hideOverlay("right");
		document.getElementById("right-overlay-text").style.display = "none";
		document.getElementById("right-overlay").style.backgroundColor = "rgba(0.0, 0.0, 0.0, 0.0)";
		console.log("right");
		currentShape.shiftByX(1);
		render(currentGame);

	});

	var bottom = document.getElementById('bottom-overlay');
	var hammer4 = new Hammer(bottom, { domEvents: true });
	hammer4.on('tap', (event) => {
		if (!gameInprogress) {
			return;
		}
		event.srcEvent.stopPropagation();
		hideOverlay("bottom");
		console.log("speedUp");
		dropCurrentShape(currentShape, currentGame);
		if (!currentShape.shape) {
			currentShape = new Shape(currentGame);
		}
		render(currentGame);

	});
	hammer4.on('doubletap', () => {
		if (!gameInprogress) {
			return;
		}
		hideOverlay("bottom");
		console.log("Drop to bottom");
		do {
			dropCurrentShape(currentShape, currentGame);
		} while (dropCurrentShape(currentShape, currentGame));

		if (!currentShape.shape) {
			currentShape = new Shape(currentGame);
		}
		render(currentGame);
	});
	function hideOverlay(side) {
		document.getElementById(side + "-overlay-text").style.display = "none";
		document.getElementById(side + "-overlay").style.backgroundColor = "rgba(0.0, 0.0, 0.0, 0.0)";
	}
}
