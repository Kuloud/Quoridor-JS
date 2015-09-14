var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game', this);

//  Game Panel
var canvasGrid;

var blockSize = 38;
var blockGap = 6;
var panelSize = blockSize * 14 + blockGap * 11;

var blockColor = 0x26231c;

var baffleplates = [];
var baffleplateColor = 0xd6ad81;

function create() {
    game.stage.backgroundColor = '#3f5c67';

    creatGamePanel();
    createBafflePlates();

};

function render() {

};


function creatGamePanel() {
    var graphics = game.add.graphics(0, 0);


    graphics.lineStyle(0, blockColor, 0);

    graphics.beginFill(blockColor);
    graphics.quadraticCurveTo(blockSize / 2, 0, blockSize, blockSize);

    graphics.quadraticCurveTo(blockSize * 3 / 2, 2 * blockSize, 2 * blockSize, 2 * blockSize);
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
        };
    };
    graphics.endFill();

    graphics.beginFill(0x703434);
    graphics.drawRect(2 * blockSize, 2 * blockSize + blockGap, blockGap, 5 * (blockSize + blockGap));
    graphics.endFill();

    var sprite = game.add.sprite(0, 0, graphics.generateTexture());

    sprite = game.add.sprite(panelSize, panelSize, graphics.generateTexture());
    sprite.scale.x *= -1;
    sprite.scale.y *= -1;

    sprite = game.add.sprite(0, panelSize, graphics.generateTexture());
    sprite.scale.x *= 1;
    sprite.scale.y *= -1;

    sprite = game.add.sprite(panelSize, 0, graphics.generateTexture());
    sprite.scale.x *= -1;
    sprite.scale.y *= 1;

    graphics.destroy();
};

function createBafflePlates() {
    var graphics = game.add.graphics(0, 0);
    var length = 2 * blockSize + blockGap;
    graphics.beginFill(baffleplateColor);
    graphics.drawRect(0, 2 * blockSize, length, blockGap);
    graphics.endFill();
    for (var i = 0; i < 20; i++) {
        var sprite = game.add.sprite(0, 0, graphics.generateTexture());

        if (i >= 10) {
            sprite.x = panelSize - length;
            sprite.y = 2 * blockSize + (20 - i) * (blockSize + blockGap);
        } else {
            sprite.x = 0;
            sprite.y = 2 * blockSize + i * (blockSize + blockGap);
        }
        
        baffleplates.push(sprite);
    };
    graphics.destroy();
};
