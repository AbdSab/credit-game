import Phaser from "phaser";

export default class GameScene extends Phaser.Scene {

    constructor(config) {
        super(config);
    }

    preload() {
        this.load.image('ship', 'game/PNG/playerShip1_orange.png');
    }

    create() {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.myShip = new Ship(this, 200, 500);
        this.add.existing(this.myShip);
    }

    update() {
        if (this.cursors.left.isDown) {
            this.myShip.moveLeft();
        }

        if (this.cursors.right.isDown) {
            this.myShip.moveRight();
        }

        if (this.cursors.up.isDown) {
            this.myShip.moveUp();
        }

        if (this.cursors.down.isDown) {
            this.myShip.moveDown();
        }

        if (this.cursors.space.isDown) {
            // shooting guns goes here
        }
    }
}