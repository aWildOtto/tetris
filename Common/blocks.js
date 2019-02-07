function Blocks() {
	this.blocks = [];
	var that = this;
	this.addBlocks = function (matrix) {
		matrix.forEach(function (v) {
			that.blocks.push(v);
		});
	}
	this.checkForClash = function (block) {
		that.blocks.forEach((b) => {
			var sameBlock = false;
			b.forEach((v) => {
				var sameV = false;
				block.forEach((u) => {
					// if(equal(u,v)){

					// }
				});
			});
		});
	}
}