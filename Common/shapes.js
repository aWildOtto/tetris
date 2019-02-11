function Shape(game) {
	// shape munipulation methods
	this.rotate = function () {
		var isValid = true;
		var newShape = [];
		var pivotPointIndex = this.shape[0];
		var sumIndex = 0;
		var ppx = pivotPointIndex % 10;
		var ppy = Math.floor(pivotPointIndex / 10);
		newShape.push(pivotPointIndex);
		occupyShape(this.shape, false);
		for (var i = 1; i < 4; i++) {
			var index = this.shape[i];
			var x = index % 10;
			var y = Math.floor(index / 10);
			var differenceX = x - ppx;
			var differenceY = y - ppy;
			sumIndex += (index - pivotPointIndex);
			// test point is on the left-hand side of the pivot point
			if (differenceX < 0) {
				if ((ppy + Math.abs(differenceX)) > 19) { isvalid = false; }
				if (differenceY > 0) {
					if ((ppx + differenceY) > 9) { isValid = false; }
				} else {
					if ((ppx + differenceY) < 0) { isvalid = false; }
				}
				newShape.push(Math.abs(differenceX) * 10 + pivotPointIndex + differenceY);
			} else if (differenceX > 0) {
				if ((ppy - differenceX) < 0) { isValid = false; }
				if (differenceY > 0) {
					if ((ppx + differenceY) > 9) { isValid = false; }
				} else {
					if ((ppx + differenceY) < 0) { isValid = false; }
				}
				newShape.push(pivotPointIndex - Math.abs(differenceX) * 10 + differenceY);
			} else if (differenceX == 0) {
				if (differenceY > 0) {
					if ((ppx + differenceY) > 9) { isValid = false; }
				} else if (differenceY < 0) {
					if ((ppx + differenceY) < 0) { isValid = false; }
				}
				newShape.push(pivotPointIndex + differenceY);
			}
		}
		console.log(isValid);
		console.log(sumIndex == 22);
		if (isValid && sumIndex != 22) {//shape O can't 
			this.shape = newShape;
			occupyShape(newShape, true, this.color);
		}
	}
	this.shiftByX = function (s) {
		var newShape = [];
		for (let index of this.shape) {
			if (Math.floor((index + s) / 10) !== Math.floor(index / 10)) {
				return;//boundary check
			}
		}
		occupyShape(this.shape, false);
		for (let index of this.shape) {
			if (game.checkOccupy(index + s)) {
				occupyShape(this.shape, true, this.color);
				return;
			}
		}
		for (let index of this.shape) {
			newShape.push(index + s);
			game.occupyBlock(index + s, true, this.color);
		}
		this.shape = newShape;
	}

	this.shiftByY = function (s) {
		if (!this.shape) {
			return false;
		}
		var newShape = [];
		for (let index of this.shape) {
			if (index + (10 * s) > 199) {
				console.log("touch down", index + 10 * s);
				return false;
			}
		}
		occupyShape(this.shape, false);
		for (let index of this.shape) {
			if (game.checkOccupy(index + 10 * s)) {
				console.log("overlap", index + 10 * s);
				occupyShape(this.shape, true, this.color);
				return false;
			}
		}
		for (let index of this.shape) {
			newShape.push(index + s * 10);
			game.occupyBlock(index + s * 10, true, this.color);
		}
		this.shape = newShape;
		return true;
	}
	function occupyShape(shape, o, color) {
		shape.forEach((v) => {
			game.occupyBlock(v, o, color);
		})
	}
	function genRandomShape(shapeColor) {
		var randomNum = getRandomInt(0, 6);
		var randomStartingShift;
		var shape;
		switch (randomNum) {
			case 0://O
				shape = [0, 1, 10, 11];
				randomStartingShift = getRandomInt(0, 8);
				break;
			case 1://I
				shape = [2, 0, 1, 3];
				randomStartingShift = getRandomInt(0, 6);
				break;
			case 2://L
				shape = [1, 0, 2, 10];
				randomStartingShift = getRandomInt(0, 7);
				break;
			case 3://J
				shape = [1, 0, 2, 12];
				randomStartingShift = getRandomInt(0, 7);
				break;
			case 4://S
				shape = [1, 2, 10, 11];
				randomStartingShift = getRandomInt(0, 7);
				break;
			case 5://Z
				shape = [1, 0, 11, 12];
				randomStartingShift = getRandomInt(0, 7);
				break;
			case 6://T
				shape = [1, 0, 2, 11];
				randomStartingShift = getRandomInt(0, 7);
				break;
			default:
				break;
		}
		shape = shape.map((i) => {
			return i + randomStartingShift;
		});
		for (let i = 0; i < shape.length; i++) {
			if (game.checkOccupy(i)) {
				return false;
			}
		}
		occupyShape(shape, true, shapeColor);
		return shape;
	}
	this.color = randomColor();
	this.shape = genRandomShape(this.color);
}

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max + 1);
	return Math.floor(Math.random() * (max - min)) + min; //The maximum is inclusive and the minimum is inclusive
}