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
		var x = 0;
		var filledX = 0;
		var freedRows = 0;
		this.gameBlocks.forEach((block) => {
			if (block.occupied) {
				filledX += 1;
			}
			if (x % 10 === 9) {
				if (filledX === 10) {
					freeBlocks(x - 9, x);
					freedRows++;
				}
				filledX = 0;
			}
			x++;
		});
		if (freedRows) {
			theGame.shiftdownEverything(freedRows);
		}
	}

	function freeBlocks(start, end) {
		for (let i = start; i <= end; i++) {
			theGame.occupyBlock(i, false);
		}
	}
	this.shiftdownEverything = function (shiftRows) {
		var shiftedBlocks = [];
		theGame.gameBlocks.forEach((block, index) => {
			if (block.occupied) {
				shiftedBlocks.push(index + shiftRows * 10);
				theGame.occupyBlock(index, false);
			}
		});
		shiftedBlocks.forEach((i) => {
			theGame.occupyBlock(i, true);
		});
	}

	this.occupyBlock = function (index, occupy) {
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