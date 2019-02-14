//controls on mobile devices

function setMobileControls() {
	var top = document.getElementById('top-overlay');
	var hammer = new Hammer(top, { domEvents: true });
	hammer.on('tap', (event) => {
		if (!gameInprogress) {
			return;
		}
		rotateShape();
	});
	hammer.on('double tap', (e) => {
		e.srcEvent.stopPropagation();
	})

	var left = document.getElementById('left-overlay');
	var hammer2 = new Hammer(left, { domEvents: true });
	hammer2.on('tap', (event) => {
		if (!gameInprogress) {
			return;
		}
		event.srcEvent.stopPropagation();
		shiftLeftOrRight(-1);
	});
	hammer2.on('double tap', (e) => {
		e.srcEvent.stopPropagation();
	})
	var right = document.getElementById('right-overlay');
	var hammer3 = new Hammer(right, { domEvents: true });
	hammer3.on('tap', (event) => {
		if (!gameInprogress) {
			return;
		}
		event.srcEvent.stopPropagation();
		shiftLeftOrRight(1);
	});
	hammer3.on('double tap', (e) => {
		e.srcEvent.stopPropagation();
	})
	var bottom = document.getElementById('bottom-overlay');
	var hammer4 = new Hammer(bottom, { domEvents: true });
	hammer4.on('tap', (event) => {
		if (!gameInprogress) {
			return;
		}
		event.srcEvent.stopPropagation();
		speedUpShape();
	});
	hammer4.on('doubletap', () => {
		if (!gameInprogress) {
			return;
		}
		dropToBottom();
	});
}
function hideOverlay(side) {
	document.getElementById(side + "-overlay-text").style.display = "none";
	document.getElementById(side + "-overlay").style.backgroundColor = "rgba(0.0, 0.0, 0.0, 0.0)";
}
