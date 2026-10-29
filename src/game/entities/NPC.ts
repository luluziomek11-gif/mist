import Phaser from 'phaser';

export class NPC extends Phaser.Physics.Arcade.Sprite {
    public key: string;

    constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
        super(scene, x, y, key, 1);
        this.key = key;

        scene.add.existing(this);
        scene.physics.add.existing(this);

        if (this.body) {
            (this.body as Phaser.Physics.Arcade.Body).setImmovable(true);
            (this.body as Phaser.Physics.Arcade.Body).setSize(16, 16);
            (this.body as Phaser.Physics.Arcade.Body).setOffset(8, 16);
        }
    }
}
