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
	//this.load.pack("start", "assets/assets-pack.json");
};

Menu.prototype.create = function() {
	// TODO Just for test
	this.startBtn = this.add.text(this.world.centerX, this.world.centerY, "Start", { font: "28px Arial", fill: "#ff0044", align: "center" });
	this.startBtn.inputEnabled = true;
	this.startBtn.events.onInputDown.add(this.startGame, this);
};

Menu.prototype.startGame = function() {
	this.game.state.start("Game");
};

