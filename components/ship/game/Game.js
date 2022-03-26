import Phaser from "phaser";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "./constants";
import { preload, create, update } from "./GameScene";

export default class Game {
    constructor({ canvas }) {
        this.canvas = canvas;
        this.config = {
            type: Phaser.AUTO,
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT,
            parent: canvas,
            physics: {
                default: 'arcade'
            },
            scene: {
                preload,
                create,
                update
            }
        };
        this.game = new Phaser.Game(this.config);
    }
} 