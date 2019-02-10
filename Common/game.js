function Game() {
	this.gameBlocks = [];
	var cordX = -100;
	var cordY = 200;
	var j = 0;
	var theGame = this;
	for (let i = 0; i < 200; i++) {
		// var x = i % 10;
		// var y = Math.floor(i / 10);
		this.gameBlocks.push({
			color: [],
			vertices: [[cordX, cordY], [cordX + 20, cordY], [cordX + 20, cordY - 20], [cordX, cordY - 20]],
			occupied: false
		});
		cordX += 20;
		j++;
		if (j === 10) {
			j = 0;
			cordY -= 20;
			cordX = -100;
		}
	};
	console.log(this.gameBlocks);

	this.checkOccupy = function (index) {
		return this.gameBlocks[index].occupied;
	}

	this.checkCompleteRow = function () {
		var clearedRowStart = [];
		var filledX = 0;
		var numFreedRows = 0;
		this.gameBlocks.forEach((block, i) => {
			if (block.occupied) {
				filledX += 1;
			}
			if (i % 10 === 9) {
				if (filledX === 10) {
					freeBlocks(i - 9, i);
					clearedRowStart.push(i - 9);
					numFreedRows++;
				}
				filledX = 0;
			}
		});
		if (numFreedRows) {
			theGame.shiftdownEverything(clearedRowStart);
		}
		return numFreedRows;
	}

	function freeBlocks(start, end) {
		for (let i = start; i <= end; i++) {
			theGame.occupyBlock(i, false);
		}
	}
	this.shiftdownEverything = function (clearedRowStart) {
		clearedRowStart.forEach((rowStart) => {
			var shiftedBlocks = [];
			theGame.gameBlocks.forEach((block, index) => {
				if (block.occupied && index < rowStart) {
					theGame.occupyBlock(index, false);//first unOccupy all blocks above the cleared row
					shiftedBlocks.push(index + 10);//store the shifted down indexes
				}
			});
			shiftedBlocks.forEach((i) => {//then put the shifted indexes 
				theGame.occupyBlock(i, true);
			});
		});
	}

	this.occupyBlock = function (index, occupy) {
		if (!this.gameBlocks[index]) {
			console.log(this.gameBlocks);
			// breakpoint;
		}
		this.gameBlocks[index].occupied = occupy;
	}

	this.getAllBlockVertices = function () {
		var vertices = [];
		this.gameBlocks.forEach((block) => {
			if (block.occupied) {
				vertices.push(block.vertices[0]);
				vertices.push(block.vertices[1]);
				vertices.push(block.vertices[2]);
				vertices.push(block.vertices[0]);
				vertices.push(block.vertices[2]);
				vertices.push(block.vertices[3]);
			}
		});
		return vertices;
	}
	this.getBlockVertices = function (index) {
		var vertices = [];
		var block = this.gameBlocks[index];
		vertices.push(block.vertices[0]);
		vertices.push(block.vertices[1]);
		vertices.push(block.vertices[2]);
		vertices.push(block.vertices[0]);
		vertices.push(block.vertices[2]);
		vertices.push(block.vertices[3]);
		return vertices;
	}
}