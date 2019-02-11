function Game() {
	this.blockMap = [];
	this.occupiedVertices = [];
	this.colorMap = {};
	var cordX = -100;
	var cordY = 200;
	var j = 0;
	var theGame = this;
	for (let i = 0; i < 200; i++) {
		// var x = i % 10;
		// var y = Math.floor(i / 10);
		this.blockMap.push([[cordX, cordY], [cordX + 20, cordY], [cordX + 20, cordY - 20], [cordX, cordY - 20]]);
		cordX += 20;
		j++;
		if (j === 10) {
			j = 0;
			cordY -= 20;
			cordX = -100;
		}
	};
	console.log(this.blockMap);

	this.checkOccupy = function (index) {
		return this.occupiedVertices.includes(index);
	}

	this.checkCompleteRow = function () {
		var clearedRowStart = [];
		var numFreedRows = 0;
		this.occupiedVertices = this.occupiedVertices.sort();
		var rowCheck = [];
		var verToClear = [];
		this.occupiedVertices.forEach((i, index) => {
			rowCheck.push(i);
			if (index === this.occupiedVertices.length - 1 ||//it's last row 
				Math.floor(i / 10) !== Math.floor(this.occupiedVertices[index + 1] / 10)) {
				//end of a row
				if (rowCheck.length === 10) {
					verToClear = verToClear.concat(rowCheck);
					clearedRowStart.push(i - 9);
					numFreedRows++;
				}
				rowCheck = [];
			}
		});
		if (numFreedRows) {
			freeBlocks(verToClear);
			theGame.shiftdownEverything(clearedRowStart);
		}
		return numFreedRows;
	}

	function freeBlocks(verToClear) {//clear from start to end, including end
		verToClear.forEach((i) => {
			theGame.occupyBlock(i, false);
		});
	}
	this.shiftdownEverything = function (clearedRowStart) {
		clearedRowStart.forEach((rowStart) => {
			this.occupiedVertices = this.occupiedVertices.map((i) => {
				if (i < rowStart) {
					return i + 10;
				}
				return i;
			});
		});
	}

	this.occupyBlock = function (index, occupy, color) {
		// if (!this.occupiedVertices[index]) {
		// 	console.log(index);
		// }
		if (occupy && color) {
			this.occupiedVertices.push(index);
			this.colorMap[index] = color;
		} else {
			this.occupiedVertices = this.occupiedVertices.filter((i) => {
				return i != index;// delete the block index from the game
			});
			delete this.colorMap[index];
		}
	}

	this.getAllBlockVertices = function () {
		var vertices = [];
		this.occupiedVertices = this.occupiedVertices.sort();
		this.occupiedVertices.forEach((index) => {
			vertices.push(this.blockMap[index][0]);
			vertices.push(this.blockMap[index][1]);
			vertices.push(this.blockMap[index][2]);
			vertices.push(this.blockMap[index][0]);
			vertices.push(this.blockMap[index][2]);
			vertices.push(this.blockMap[index][3]);
		});
		return vertices;
	}
	this.getAllColor = function () {
		this.occupiedVertices = this.occupiedVertices.sort();
		var colors = [];
		this.occupiedVertices.forEach((index) => {
			colors.push(theGame.colorMap[index]);
			colors.push(theGame.colorMap[index]);
			colors.push(theGame.colorMap[index]);
			colors.push(theGame.colorMap[index]);
			colors.push(theGame.colorMap[index]);
			colors.push(theGame.colorMap[index]);
		});
		return colors;
	}

	this.getBlockVertices = function (index) {
		var vertices = [];
		vertices.push(this.blockMap[index][0]);
		vertices.push(this.blockMap[index][1]);
		vertices.push(this.blockMap[index][2]);
		vertices.push(this.blockMap[index][0]);
		vertices.push(this.blockMap[index][2]);
		vertices.push(this.blockMap[index][3]);
		return vertices;
	}
}