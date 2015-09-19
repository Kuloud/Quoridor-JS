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
var blockSize = 40;
var blockGap = 8;
var panelSize = blockSize * 13 + blockGap * 10;

var blockColor = 0x26231c;
var blocks = [ 9 ][9];

var baffleplates = [];
var baffleplateHint;
var baffleplateColor = 0xd6ad81;

// Player
var players = [];
var currentIdx = -1;

Game.prototype.preload = function() {
	// TODO: generated method.
};

Game.prototype.create = function() {
	this.creatGamePanel();
	this.createBafflePlates();
	this.initPlayers(4);
	this.input.addMoveCallback(this.onMouseMoveCb, this);
	// Start the game
	this.turnPlayer();
};

Game.prototype.update = function() {
};

Game.prototype.render = function() {
	this.game.debug.inputInfo(32, 32);
}

// -----------------------------------------------
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
	graphics.beginFill(0xffffff);
	graphics.drawRect(0, 2 * blockSize, length, blockGap);
	graphics.endFill();
	for (var i = 0; i < 20; i++) {
		var sprite = this.add.sprite(0, 0, graphics.generateTexture());
		sprite.anchor.set(0.5, 0.5);

		if (i >= 10) {
			sprite.x = panelSize - length / 2;
			sprite.y = 2 * blockSize + blockGap / 2 + (19 - i) * (blockSize + blockGap);
		} else {
			sprite.x = length / 2;
			sprite.y = 2 * blockSize + blockGap / 2 + i * (blockSize + blockGap);
		}

		baffleplates.push(sprite);
	}

	baffleplateHint = this.add.sprite(0, 0, graphics.generateTexture());
	baffleplateHint.anchor.set(0.5, 0.5);
	baffleplateHint.alpha = 0.3;
	baffleplateHint.visible = false;

	graphics.destroy();
};

Game.prototype.initPlayers = function(playerCount) {
	var playerColors = [ 0xcea97c, 0x812f33, 0xae6a21, 0x169ada ];

	if (playerCount >= 1) {
		this.addAPlayer(Role.newInstance(0, 4, playerColors[0]));
	}
	if (playerCount >= 2) {
		this.addAPlayer(Role.newInstance(8, 4, playerColors[1]));
	}
	if (playerCount >= 3) {
		this.addAPlayer(Role.newInstance(4, 8, playerColors[2]));
	}
	if (playerCount >= 4) {
		this.addAPlayer(Role.newInstance(4, 0, playerColors[3]));
	}

	this.initBaffleplatesByPlayer();
}

Game.prototype.addAPlayer = function(player) {
	var graphics = this.add.graphics(0, 0);
	graphics.beginFill(0xffffff);
	graphics.drawCircle(0, 0, blockSize * 0.8);
	graphics.endFill();
	var p = this.calcBlockPosition(player.x, player.y);
	var playerSprite = this.add.sprite(p[0], p[1], graphics.generateTexture());
	playerSprite.anchor.set(0.5, 0.5);
	playerSprite.tint = player.color;
	this.add.existing(playerSprite);
	player.sprite = playerSprite;
	player.hintTween = this.add.tween(playerSprite.scale).to({
		x : 0.8,
		y : 0.8
	}, 1000, Phaser.Easing.Quadratic.InOut, false, 0, -1);
	players.push(player);
	graphics.destroy();
}

Game.prototype.initBaffleplatesByPlayer = function() {
	var baffleEachPlayer = Math.floor(20 / players.length);
	var j = 0;

	for (var k = 0; k < players.length; k++) {
		for (var i = 0; i < baffleEachPlayer; i++) {
			baffleplates[j].tint = players[k].color;
			players[k].baffleplates.push(baffleplates[j]);
			j++;
		}
	}
}

// -----------------------------------------------

Game.prototype.turnPlayer = function() {
	if (currentIdx >= 0) {
		players[currentIdx].stopHint();
	}
	currentIdx++;
	currentIdx %= players.length;
	players[currentIdx].startHint();
}

// -----------------------------------------------
Game.prototype.onMouseMoveCb = function(pointer, x, y) {
	if (this.calcInGamePanel(x, y)) {
		if (this.calcInGap(x, y)) {
			baffleplateHint.visible = true;
			baffleplateHint.tint = players[currentIdx].color;
		} else {
			baffleplateHint.visible = false;
		}

	} else {
		baffleplateHint.visible = false;
	}
}

// -----------------------------------------------

Game.prototype.calcBlockPosition = function(x, y) {
	var r = [ 2 ];
	r[0] = 2.5 * blockSize + x * (blockSize + blockGap) + blockGap;
	r[1] = 2.5 * blockSize + y * (blockSize + blockGap) + blockGap;
	return r;
}

Game.prototype.calcInGamePanel = function(x, y) {
	var offset = 2 * blockSize + blockGap;
	if (x >= offset && x <= panelSize - offset && y >= offset
			&& y <= panelSize - offset) {
		return true;
	} else {
		return false;
	}
}

Game.prototype.calcInGap = function(x, y) {
	var offset = 2 * blockSize + blockGap;
	if (((x - offset) % (blockSize + blockGap) > blockSize)
			^ ((y - offset) % (blockSize + blockGap) > blockSize)) {
		return true;
	} else {
		return false;
	}
}

// -----------------------------------------------

/**
 * Player class
 */
var Role = {
	newInstance : function(x, y, color) {
		var role = {};
		role.x = x;
		role.y = y;
		role.color = color;
		role.baffleplates = [];
		role.stopHint = function() {
			role.hintTween.stop(true);
		};
		role.startHint = function() {
			role.hintTween.start();
		};
		return role;
	}
};
