import { SCREEN_HEIGHT, SCREEN_WIDTH } from "./constants";
import GameScene from "./GameScene";

export default class Game {
    constructor({ canvas }) {
        this.canvas = canvas;
        this.config = {
            type: Phaser.AUTO,
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT,
            physics: {
                default: 'arcade'
            }
        };
        this.game = new Pasher(this.config);
        this.game.scene.add('game', GameScene, true, { x: 200, y: 300 })
    }
} 