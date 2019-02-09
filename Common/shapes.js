function Shape() {
	// shape munipulation methods
	this.shift = function (u) {
		if (u[0]) {
			if (u[0] > 0 && !isRightInBound(this.shape, u[0])) {
				return;
			}
			if (u[0] < 0 && !isLeftInBound(this.shape, u[0])) {
				return;
			}
		}
		if (u[1] && !isBottomInBound(this.shape, u[1])) {
			this.die(this.blockPile);
			return;
		}
		var that = this;
		var clashed = false;
		var shifted_shape = this.shape.map(function (block) {
			var newBlock = block.map((v) => {
				var newV = add(v, u);
				return newV;
			});
			clashed = that.blockPile.checkForClash(newBlock);
			return newBlock;
		});
		if (!clashed) {
			this.shape = shifted_shape;
		} else {
			this.die(this.blockPile);
			return;
		}
	}
	this.die = function () {
		this.blockPile.addBlocks(this.shape);
		this.shapeInd = getRandomInt(0, 6);
		this.shape = shapes[this.shapeInd];
	}
	this.getAllBlocks = function () {
		return this.shape.concat(this.blockPile.blocks);
	}

	// shape creation
	var shapes =
		[
			[//O
				//top left
				[
					vec2(-20, 200),
					vec2(-20, 180),
					vec2(0, 200),

					vec2(-20, 180),
					vec2(0, 200),
					vec2(0, 180),
				],
				//top right
				[
					vec2(20, 200),
					vec2(20, 180),
					vec2(0, 200),

					vec2(20, 180),
					vec2(0, 200),
					vec2(0, 180),
				],
				//bottom left
				[
					vec2(-20, 180),
					vec2(-20, 160),
					vec2(0, 180),

					vec2(-20, 160),
					vec2(0, 180),
					vec2(0, 160),
				],
				//bottom right
				[
					vec2(20, 180),
					vec2(20, 160),
					vec2(0, 180),

					vec2(20, 160),
					vec2(0, 180),
					vec2(0, 160)
				]
			],
			[//I
				//1
				[vec2(-20, 200),
				vec2(-20, 180),
				vec2(0, 200),

				vec2(-20, 180),
				vec2(0, 200),
				vec2(0, 180)],
				//2
				[vec2(-20, 180),
				vec2(-20, 160),
				vec2(0, 180),

				vec2(-20, 160),
				vec2(0, 180),
				vec2(0, 160)],
				//3
				[vec2(-20, 160),
				vec2(-20, 140),
				vec2(0, 160),

				vec2(-20, 140),
				vec2(0, 140),
				vec2(0, 160)],
				//4
				[vec2(-20, 140),
				vec2(-20, 120),
				vec2(0, 140),

				vec2(-20, 120),
				vec2(0, 120),
				vec2(0, 140)],
			],
			[//L
				//1
				[vec2(-20, 200),
				vec2(-20, 180),
				vec2(0, 200),

				vec2(-20, 180),
				vec2(0, 200),
				vec2(0, 180)],
				//2
				[vec2(-20, 180),
				vec2(-20, 160),
				vec2(0, 180),

				vec2(-20, 160),
				vec2(0, 180),
				vec2(0, 160)],
				//3
				[vec2(-20, 160),
				vec2(-20, 140),
				vec2(0, 160),

				vec2(-20, 140),
				vec2(0, 140),
				vec2(0, 160)],
				//4
				[vec2(0, 160),
				vec2(0, 140),
				vec2(20, 160),

				vec2(0, 140),
				vec2(20, 140),
				vec2(20, 160)]
			],
			[//J
				//1
				[vec2(-20, 200),
				vec2(-20, 180),
				vec2(0, 200),

				vec2(-20, 180),
				vec2(0, 200),
				vec2(0, 180)],
				//2
				[vec2(-20, 180),
				vec2(-20, 180),
				vec2(0, 180),

				vec2(-20, 180),
				vec2(0, 180),
				vec2(0, 180)],
				//3
				[vec2(-20, 180),
				vec2(-20, 140),
				vec2(0, 180),

				vec2(-20, 140),
				vec2(0, 140),
				vec2(0, 180)],
				//4
				[vec2(-40, 160),
				vec2(-40, 140),
				vec2(-20, 160),

				vec2(-40, 140),
				vec2(-20, 140),
				vec2(-20, 160)]
			],
			[//Z 
				//top left
				[vec2(-20, 200),
				vec2(-20, 180),
				vec2(0, 200),

				vec2(-20, 180),
				vec2(0, 200),
				vec2(0, 180)],
				//top right
				[vec2(20, 200),
				vec2(20, 180),
				vec2(0, 200),

				vec2(20, 180),
				vec2(0, 200),
				vec2(0, 180)],
				//bottom left
				[vec2(20, 180),
				vec2(20, 160),
				vec2(0, 180),

				vec2(20, 160),
				vec2(0, 180),
				vec2(0, 160)],
				//bottom right
				[vec2(40, 180),
				vec2(40, 160),
				vec2(20, 180),

				vec2(40, 160),
				vec2(20, 180),
				vec2(20, 160)]
			],
			[//S
				//top left
				[vec2(0, 200),
				vec2(0, 180),
				vec2(20, 200),

				vec2(0, 180),
				vec2(20, 200),
				vec2(20, 180)],
				//top right
				[vec2(40, 200),
				vec2(40, 180),
				vec2(20, 200),

				vec2(40, 180),
				vec2(20, 200),
				vec2(20, 180)],
				//bottom left
				[vec2(0, 180),
				vec2(0, 160),
				vec2(-20, 180),

				vec2(0, 160),
				vec2(-20, 180),
				vec2(-20, 160)],
				//bottom right
				[vec2(20, 180),
				vec2(20, 160),
				vec2(0, 180),

				vec2(20, 160),
				vec2(0, 180),
				vec2(0, 160)]
			],
			[//T
				//top left
				[vec2(-20, 200),
				vec2(-20, 180),
				vec2(0, 200),

				vec2(-20, 180),
				vec2(0, 200),
				vec2(0, 180)],
				//top middle
				[vec2(20, 200),
				vec2(20, 180),
				vec2(0, 200),

				vec2(20, 180),
				vec2(0, 200),
				vec2(0, 180)],
				//top right
				[vec2(40, 200),
				vec2(40, 180),
				vec2(20, 200),

				vec2(40, 180),
				vec2(20, 200),
				vec2(20, 180)],
				//bottom
				[vec2(20, 180),
				vec2(20, 160),
				vec2(0, 180),

				vec2(20, 160),
				vec2(0, 180),
				vec2(0, 160)]
			],
		];

	this.shapeInd = getRandomInt(0, 6);
	this.shape = shapes[6];
	this.blockPile = new Blocks();
	this.died = false;

	// bound checking
	function isBottomInBound(shape, yValue) {
		var min = 400;
		shape.forEach((block) => {
			// console.log(v);
			block.forEach((v) => {
				if (v[1] < min) {
					min = v[1];
				}
			});
		});

		if (min + yValue < -200) {
			return false;
		}
		return true;
	}
	function isLeftInBound(shape, xValue) {
		var min = 200;
		shape.forEach((block) => {
			block.forEach((v) => {
				// console.log(v);
				if (v[0] < min) {
					min = v[0];
				}
			});
		});

		if (min + xValue < -100) {
			return false;
		}
		return true;
	}
	function isRightInBound(shape, xValue) {
		var max = -200;
		shape.forEach((block) => {
			block.forEach((v) => {
				// console.log(v);
				if (v[0] > max) {
					max = v[0];
				}
			});
		});

		if (max + xValue > 100) {
			return false;
		}
		return true;
	}

}

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}