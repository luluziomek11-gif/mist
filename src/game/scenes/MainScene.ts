import Phaser from 'phaser';
import { Player } from '../entities/Player';
import { NPC } from '../entities/NPC';

export class MainScene extends Phaser.Scene {
    private player!: Player;
    private ultron!: NPC;
    private edith!: NPC;
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private shiftKey!: Phaser.Input.Keyboard.Key;

    constructor() {
        super('MainScene');
    }

    preload() {
        this.load.spritesheet('player', 'assets/player.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('ultron', 'assets/ultron.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('edith', 'assets/edith.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('tiles', 'assets/tiles.png');
    }

    create() {
        // Simple map data (0=floor, 1=wall, 2=couch, 3=pc desk)
        const mapData = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 2, 0, 0, 3, 0, 0, 0, 1, 0, 3, 0, 0, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];

        const map = this.make.tilemap({ data: mapData, tileWidth: 32, tileHeight: 32 });
        const tiles = map.addTilesetImage('tiles');
        if (!tiles) throw new Error('Tileset not loaded properly');
        const layer = map.createLayer(0, tiles, 0, 0);
        if (!layer) throw new Error('Layer not created properly');
        layer.setCollision([1, 2, 3]);

        this.player = new Player(this, 96, 96);
        this.ultron = new NPC(this, 160, 96, 'ultron');
        this.edith = new NPC(this, 400, 96, 'edith');

        this.physics.add.collider(this.player, layer);
        this.physics.add.collider(this.ultron, layer);
        this.physics.add.collider(this.edith, layer);
        this.physics.add.collider(this.player, this.ultron);
        this.physics.add.collider(this.player, this.edith);

        if (this.input.keyboard) {
            this.cursors = this.input.keyboard.createCursorKeys();
            this.shiftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        }

        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(2);

        // Define animations
        this.createAnimations('player');
        this.createAnimations('ultron');
        this.createAnimations('edith');
    }

    private createAnimations(key: string) {
        const framesPerRow = 3;
        this.anims.create({
            key: `${key}-down`,
            frames: this.anims.generateFrameNumbers(key, { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: `${key}-left`,
            frames: this.anims.generateFrameNumbers(key, { start: framesPerRow, end: framesPerRow + 2 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: `${key}-right`,
            frames: this.anims.generateFrameNumbers(key, { start: framesPerRow * 2, end: framesPerRow * 2 + 2 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: `${key}-up`,
            frames: this.anims.generateFrameNumbers(key, { start: framesPerRow * 3, end: framesPerRow * 3 + 2 }),
            frameRate: 10,
            repeat: -1
        });
    }

    update() {
        this.player.update(this.cursors, this.shiftKey);
    }
}
