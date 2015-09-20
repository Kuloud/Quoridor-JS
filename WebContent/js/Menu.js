/**
 * Menu state.
 */
function Menu() {
	Phaser.State.call(this);
}

/** @type Phaser.State */
var proto = Object.create(Phaser.State);
Menu.prototype = proto;

Menu.prototype.preload = function() {
	// this.load.pack("start", "assets/assets-pack.json");
};

Menu.prototype.create = function() {
	// TODO Just for test
	// this.startGame();
	var startBtn2 = this.add.text(this.world.centerX, this.world.centerY - 60,
			"2 Players", {
				font : "28px Arial",
				fill : "#ff0044",
				align : "center"
			});
	startBtn2.inputEnabled = true;
	startBtn2.events.onInputDown.add(this.two, this);
	var startBtn3 = this.add.text(this.world.centerX, this.world.centerY,
			"3 Players", {
				font : "28px Arial",
				fill : "#ff0044",
				align : "center"
			});
	startBtn3.inputEnabled = true;
	startBtn3.events.onInputDown.add(this.three, this);
	var startBtn4 = this.add.text(this.world.centerX, this.world.centerY + 60,
			"4 Players", {
				font : "28px Arial",
				fill : "#ff0044",
				align : "center"
			});
	startBtn4.inputEnabled = true;
	startBtn4.events.onInputDown.add(this.four, this);
};

Menu.prototype.two = function() {
	this.game.state.start("Game", true, false, 2);
};

Menu.prototype.three = function() {
	this.game.state.start("Game", true, false, 3);
};

Menu.prototype.four = function() {
	this.game.state.start("Game", true, false, 4);
};
