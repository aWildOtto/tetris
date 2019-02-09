function Blocks() {
	this.blocks = [];
	var that = this;
	this.addBlocks = function (matrix) {
		matrix.forEach(function (v) {
			that.blocks.push(v);
		});
	}
	this.checkForClash = function (block) {
		var clashed = false;
		that.blocks.forEach((b) => {
			if (checkBlockClash(b, block)) {
				clashed = true;
			}
		});
		return clashed;
	}

	function checkBlockClash(block1, block2) {
		var sameV = 0;
		block1 = eliminateDup(block1);
		block2 = eliminateDup(block2);
		block1.forEach((v) => {
			var matched = [];
			block2.forEach((u, index) => {
				if (!matched.includes(index) && equal(u, v)) {
					sameV++;
					matched.push(index);
				}
			})
		});
		if (sameV === 4) {
			return true;
		}
		return false;
	}
	function eliminateDup(block) {
		var cleanBlockCheck = {};
		var cleanBlock = [];
		block.forEach((v) => {
			var str = JSON.stringify(v);
			if (!cleanBlockCheck[str]) {
				cleanBlockCheck[str] = 1;
				cleanBlock.push(v);
			}
		});
		return cleanBlock;
	}
}