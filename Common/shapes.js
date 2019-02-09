function Shape(game) {
	// shape munipulation methods
	this.rotate = function () {

	}
	this.shiftByX = function (s) {
		var newShape = [];
		for (let index of this.shape) {
			if (Math.floor((index + s) / 10) !== Math.floor(index / 10)) {
				return;
			}
		}
		occupyShape(this.shape, false);
		for (let index of this.shape) {
			if (game.checkOccupy(index + s)) {
				occupyShape(this.shape, true);
				return;
			}
		}
		for (let index of this.shape) {
			newShape.push(index + s);
			game.occupyBlock(index + s, true);
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
				occupyShape(this.shape, true);
				return false;
			}
		}
		for (let index of this.shape) {
			newShape.push(index + s * 10);
			game.occupyBlock(index + s * 10, true);
		}
		this.shape = newShape;
		return true;
	}
	this.getNewShape = function () {
		var clearedRowNum = game.checkCompleteRow();
		this.shape = genRandomShape();
		if (!this.shape) {
			return -1;
		}
		return clearedRowNum;
	}
	function occupyShape(shape, o) {
		shape.forEach((v) => {
			game.occupyBlock(v, o);
		})
	}
	function genRandomShape() {
		var randomNum = getRandomInt(0, 1);
		var randomStartingShift;
		var shape;
		switch (randomNum) {
			case 0://O
				shape = [0, 1, 10, 11];
				randomStartingShift = getRandomInt(0, 8);
				break;
			case 1://I
				shape = [0, 10, 20, 30];
				randomStartingShift = getRandomInt(0, 9);
				break;
			case 2://L
				shape = [0, 10, 20, 21];
				randomStartingShift = getRandomInt(0, 8);
				break;
			case 3://J
				shape = [1, 11, 21, 20];
				randomStartingShift = getRandomInt(0, 8);
				break;
			case 4://S
				shape = [1, 2, 10, 11];
				randomStartingShift = getRandomInt(0, 7);
				break;
			case 5://Z
				shape = [0, 1, 11, 12];
				randomStartingShift = getRandomInt(0, 7);
				break;
			case 6://T
				shape = [0, 1, 2, 11];
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
		occupyShape(shape, true);
		return shape;
	}

	this.shape = genRandomShape();

}

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max + 1);
	return Math.floor(Math.random() * (max - min)) + min; //The maximum is inclusive and the minimum is inclusive
}