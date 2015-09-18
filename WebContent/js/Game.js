/**
 * Game state.
 */
function Game() {
	Phaser.State.call(this);
	// TODO: generated method.
}

/** @type Phaser.State */
var proto = Object.create(Phaser.State);
Game.prototype = proto;

// Game Panel
var canvasGrid;

var blockSize = 40;
var blockGap = 8;
var panelSize = blockSize * 13 + blockGap * 10;

var blockColor = 0x26231c;
var blocks = [ 9 ][9];

var baffleplates = [];
var previewBaffleplates = [ 2 ];
var baffleplateColor = 0xd6ad81;

// Player
var players = [];

Game.prototype.preload = function() {
	// TODO: generated method.
};

Game.prototype.create = function() {
	this.creatGamePanel();
	this.createBafflePlates();
	this.initPlayers(3);
};

Game.prototype.update = function() {
//	if (this.input.activePointer.) {
//		
//	}
};

Game.prototype.creatGamePanel = function() {
	var graphics = this.add.graphics(0, 0);

	graphics.lineStyle(0, blockColor, 0);

	graphics.beginFill(blockColor);
	graphics.quadraticCurveTo(blockSize / 2, 0, blockSize, blockSize);

	graphics.quadraticCurveTo(blockSize * 3 / 2, 2 * blockSize, 2 * blockSize,
			2 * blockSize);
	graphics.lineTo(0, 2 * blockSize);
	graphics.endFill();

	var ix = 0;
	var iy = blockSize;
	graphics.beginFill(blockColor);
	for (var i = 0; i < 5; i++) {
		ix = 0;
		iy += blockSize + blockGap;
		graphics.drawRect(ix, iy, 2 * blockSize, blockSize);

		ix = blockSize;
		for (var j = 0; j < 5; j++) {
			ix += blockSize + blockGap;
			graphics.drawRect(ix, iy, blockSize, blockSize);
		}
	}
	graphics.endFill();

	graphics.beginFill(0x703434);
	graphics.drawRect(2 * blockSize, 2 * blockSize + blockGap, blockGap,
			5 * (blockSize + blockGap));
	graphics.endFill();

	var sprite = this.add.sprite(0, 0, graphics.generateTexture());

	sprite = this.add.sprite(panelSize, panelSize, graphics.generateTexture());
	sprite.scale.x *= -1;
	sprite.scale.y *= -1;

	sprite = this.add.sprite(0, panelSize, graphics.generateTexture());
	sprite.scale.x *= 1;
	sprite.scale.y *= -1;

	sprite = this.add.sprite(panelSize, 0, graphics.generateTexture());
	sprite.scale.x *= -1;
	sprite.scale.y *= 1;

	graphics.destroy();
};

Game.prototype.createBafflePlates = function() {
	var graphics = this.add.graphics(0, 0);
	var length = 2 * blockSize + blockGap;
	graphics.beginFill(baffleplateColor);
	graphics.drawRect(0, 2 * blockSize, length, blockGap);
	graphics.endFill();
	for (var i = 0; i < 18; i++) {
		var sprite = this.add.sprite(0, 0, graphics.generateTexture());

		if (i >= 9) {
			sprite.x = panelSize - length;
			sprite.y = 2 * blockSize + (18 - i) * (blockSize + blockGap);
		} else {
			sprite.x = 0;
			sprite.y = 2 * blockSize + i * (blockSize + blockGap);
		}

		baffleplates.push(sprite);
	}

	previewBaffleplates[0] = this.add.sprite(0, 0, graphics.generateTexture());
	previewBaffleplates[0].x = panelSize + blockGap * 4;
	previewBaffleplates[0].y = 3 * blockSize;

	previewBaffleplates[1] = this.add.sprite(0, 0, graphics.generateTexture());
	previewBaffleplates[1].angle = 90;
	previewBaffleplates[1].x = panelSize + 3 * blockSize + blockGap * 6;
	previewBaffleplates[1].y = 2 * blockSize;

	graphics.destroy();
};

Game.prototype.initPlayers = function(playerCount) {
	var playerColors = [ 0xcea97c, 0x812f33, 0xae6a21, 0x169ada ];

	if (playerCount >= 1) {
		this.addAPlayer(0, 4, playerColors[0]);
	}
	if (playerCount >= 2) {
		this.addAPlayer(8, 4, playerColors[1]);
	}
	if (playerCount >= 3) {
		this.addAPlayer(4, 8, playerColors[2]);
	}
	if (playerCount >= 4) {
		this.addAPlayer(4, 0, playerColors[3]);
	}
}

Game.prototype.addAPlayer = function(x, y, color) {
	var graphics = this.add.graphics(0, 0);
	graphics.beginFill(0xffffff);
	graphics.drawCircle(0, 0, blockSize);
	graphics.endFill();
	var p = this.calcBlockPosition(x, y);
	var player = this.add.sprite(p[0], p[1], graphics.generateTexture());
	player.tint = color;
	players.push(player);
	graphics.destroy();
}

Game.prototype.calcBlockPosition = function(x, y) {
	var r = [ 2 ];
	r[0] = 2 * blockSize + x * (blockSize + blockGap) + blockGap;
	r[1] = 2 * blockSize + y * (blockSize + blockGap) + blockGap;
	return r;
}
