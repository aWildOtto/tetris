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
			if (that.blockPile.checkForClash(block)) {
				clashed = true;
			}
			return newBlock;
		});
		if (!clashed) {
			this.shape = shifted_shape;
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
					vec2(-20, 100),
					vec2(-20, 90),
					vec2(0, 100),

					vec2(-20, 90),
					vec2(0, 100),
					vec2(0, 90),
				],
				//top right
				[
					vec2(20, 100),
					vec2(20, 90),
					vec2(0, 100),

					vec2(20, 90),
					vec2(0, 100),
					vec2(0, 90),
				],
				//bottom left
				[
					vec2(-20, 90),
					vec2(-20, 80),
					vec2(0, 90),

					vec2(-20, 80),
					vec2(0, 90),
					vec2(0, 80),
				],
				//bottom right
				[
					vec2(20, 90),
					vec2(20, 80),
					vec2(0, 90),

					vec2(20, 80),
					vec2(0, 90),
					vec2(0, 80)
				]
			],
			[//I
				//1
				[vec2(-20, 100),
				vec2(-20, 90),
				vec2(0, 100),

				vec2(-20, 90),
				vec2(0, 100),
				vec2(0, 90)],
				//2
				[vec2(-20, 90),
				vec2(-20, 80),
				vec2(0, 90),

				vec2(-20, 80),
				vec2(0, 90),
				vec2(0, 80)],
				//3
				[vec2(-20, 80),
				vec2(-20, 70),
				vec2(0, 80),

				vec2(-20, 70),
				vec2(0, 70),
				vec2(0, 80)],
				//4
				[vec2(-20, 70),
				vec2(-20, 60),
				vec2(0, 70),

				vec2(-20, 60),
				vec2(0, 60),
				vec2(0, 70)],
			],
			[//L
				//1
				[vec2(-20, 100),
				vec2(-20, 90),
				vec2(0, 100),

				vec2(-20, 90),
				vec2(0, 100),
				vec2(0, 90)],
				//2
				[vec2(-20, 90),
				vec2(-20, 80),
				vec2(0, 90),

				vec2(-20, 80),
				vec2(0, 90),
				vec2(0, 80)],
				//3
				[vec2(-20, 80),
				vec2(-20, 70),
				vec2(0, 80),

				vec2(-20, 70),
				vec2(0, 70),
				vec2(0, 80)],
				//4
				[vec2(0, 80),
				vec2(0, 70),
				vec2(20, 80),

				vec2(0, 70),
				vec2(20, 70),
				vec2(20, 80)]
			],
			[//J
				//1
				[vec2(-20, 100),
				vec2(-20, 90),
				vec2(0, 100),

				vec2(-20, 90),
				vec2(0, 100),
				vec2(0, 90)],
				//2
				[vec2(-20, 90),
				vec2(-20, 90),
				vec2(0, 90),

				vec2(-20, 90),
				vec2(0, 90),
				vec2(0, 90)],
				//3
				[vec2(-20, 90),
				vec2(-20, 70),
				vec2(0, 90),

				vec2(-20, 70),
				vec2(0, 70),
				vec2(0, 90)],
				//4
				[vec2(-40, 80),
				vec2(-40, 70),
				vec2(-20, 80),

				vec2(-40, 70),
				vec2(-20, 70),
				vec2(-20, 80)]
			],
			[//Z 
				//top left
				[vec2(-20, 100),
				vec2(-20, 90),
				vec2(0, 100),

				vec2(-20, 90),
				vec2(0, 100),
				vec2(0, 90)],
				//top right
				[vec2(20, 100),
				vec2(20, 90),
				vec2(0, 100),

				vec2(20, 90),
				vec2(0, 100),
				vec2(0, 90)],
				//bottom left
				[vec2(20, 90),
				vec2(20, 80),
				vec2(0, 90),

				vec2(20, 80),
				vec2(0, 90),
				vec2(0, 80)],
				//bottom right
				[vec2(40, 90),
				vec2(40, 80),
				vec2(20, 90),

				vec2(40, 80),
				vec2(20, 90),
				vec2(20, 80)]
			],
			[//S
				//top left
				[vec2(0, 100),
				vec2(0, 90),
				vec2(20, 100),

				vec2(0, 90),
				vec2(20, 100),
				vec2(20, 90)],
				//top right
				[vec2(40, 100),
				vec2(40, 90),
				vec2(20, 100),

				vec2(40, 90),
				vec2(20, 100),
				vec2(20, 90)],
				//bottom left
				[vec2(0, 90),
				vec2(0, 80),
				vec2(-20, 90),

				vec2(0, 80),
				vec2(-20, 90),
				vec2(-20, 80)],
				//bottom right
				[vec2(20, 90),
				vec2(20, 80),
				vec2(0, 90),

				vec2(20, 80),
				vec2(0, 90),
				vec2(0, 80)]
			],
			[//T
				//top left
				[vec2(-20, 100),
				vec2(-20, 90),
				vec2(0, 100),

				vec2(-20, 90),
				vec2(0, 100),
				vec2(0, 90)],
				//top middle
				[vec2(20, 100),
				vec2(20, 90),
				vec2(0, 100),

				vec2(20, 90),
				vec2(0, 100),
				vec2(0, 90)],
				//top right
				[vec2(40, 100),
				vec2(40, 90),
				vec2(20, 100),

				vec2(40, 90),
				vec2(20, 100),
				vec2(20, 90)],
				//bottom
				[vec2(20, 90),
				vec2(20, 80),
				vec2(0, 90),

				vec2(20, 80),
				vec2(0, 90),
				vec2(0, 80)]
			],
		];

	this.shapeInd = getRandomInt(0, 6);
	this.shape = shapes[6];
	this.blockPile = new Blocks();
	this.died = false;

	// bound checking
	function isBottomInBound(shape, yValue) {
		var min = 200;
		shape.forEach((block) => {
			// console.log(v);
			block.forEach((v) => {
				if (v[1] < min) {
					min = v[1];
				}
			});
		});

		if (min + yValue < -100) {
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