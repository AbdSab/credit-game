import Phaser from "phaser";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "./constants";

const Bullet = new Phaser.Class({
    Extends: Phaser.GameObjects.Image,
    initialize:
        function Bullet(scene) {
            Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');
            this.speed = Phaser.Math.GetSpeed(400, 1);
        },
    fire: function (x, y) {
        this.setPosition(x, y - 50);
        this.setActive(true);
        this.setVisible(true);
    },
    update: function (time, delta) {
        this.y -= this.speed * delta;
        if (this.y < -50) {
            this.setActive(false);
            this.setVisible(false);
        }
    }
});

const Meteor = new Phaser.Class({
    Extends: Phaser.GameObjects.Image,
    initialize:
        function Bullet(scene) {
            Phaser.GameObjects.Image.call(this, scene, 0, 0, 'meteor');
            this.speed = Phaser.Math.GetSpeed(200, 1);
            this.life = 2;
        },
    fire: function (x, y) {
        this.setPosition(x, y);
        this.setActive(true);
        this.setVisible(true);
    },
    update: function (time, delta) {
        this.y += this.speed * delta;
        if (this.y > SCREEN_HEIGHT + 32) {
            this.setActive(false);
            this.setVisible(false);
        }
    }
});

export function preload() {
    this.load.image('ship', '/game/PNG/playerShip1_orange.png');
    this.load.image('bullet', '/game/PNG/Lasers/laserBlue01.png');
    this.load.image('meteor', '/game/PNG/Meteors/meteorBrown_big1.png');
}

export function create() {
    this.speed = 4;
    this.cursors = this.input.keyboard.createCursorKeys();

    this.ship = this.physics.add.sprite(200, 500, 'ship');
    this.ship.setScale(.7);

    this.lastShot = new Date().getTime();
    this.shotFrequency = 250;

    this.bullets = this.physics.add.group({
        classType: Bullet,
        maxSize: 20,
        runChildUpdate: true,
    });

    this.meteors = this.physics.add.group({
        classType: Meteor,
        maxSize: 20,
        runChildUpdate: true,
    });

    this.spawnMeteors = () => {
        const meteor = this.meteors.get();
        meteor.fire(Phaser.Math.Between(32, SCREEN_WIDTH - 32), 0);
        this.time.delayedCall(Phaser.Math.Between(500, 3000), this.spawnMeteors, [], this);
    }
    this.spawnMeteors();

    this.hitMeteor = (_bullet, _meteor) => {
        console.log(_meteor)
        _meteor.life--;
        if (_meteor.life <= 0) {
            _meteor.setActive(false);
            _meteor.setVisible(false);
            _meteor.setPosition(-1000, -100);
            _meteor.life = 2;
        }
        _bullet.setActive(false);
        _bullet.setVisible(false);
        _bullet.setPosition(-100, -100);
    }

    this.physics.add.overlap(this.bullets, this.meteors, this.hitMeteor, null, this);
}

export function update() {
    if (this.cursors.left.isDown) {
        this.ship.x -= this.speed;
    }

    if (this.cursors.right.isDown) {
        this.ship.x += this.speed;
    }

    if (this.cursors.up.isDown) {
        this.ship.y -= this.speed;
    }

    if (this.cursors.down.isDown) {
        this.ship.y += this.speed;
    }

    if (this.cursors.space.isDown) {
        const currentTime = new Date().getTime();
        if (currentTime - this.lastShot > this.shotFrequency) {
            this.lastShot = currentTime;
            const bullet = this.bullets.get();
            bullet.fire(this.ship.x, this.ship.y);
        }
    }
}
