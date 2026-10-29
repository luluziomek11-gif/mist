import Phaser from 'phaser';

export class Player extends Phaser.Physics.Arcade.Sprite {
    private walkSpeed = 100;
    private runSpeed = 200;
    private wasd!: {
        up: Phaser.Input.Keyboard.Key,
        down: Phaser.Input.Keyboard.Key,
        left: Phaser.Input.Keyboard.Key,
        right: Phaser.Input.Keyboard.Key,
    };

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'player', 1);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        if (this.body) {
            (this.body as Phaser.Physics.Arcade.Body).setSize(16, 16);
            (this.body as Phaser.Physics.Arcade.Body).setOffset(8, 16);
        }

        if (scene.input.keyboard) {
            this.wasd = scene.input.keyboard.addKeys('W,S,A,D') as any;
        }
    }

    update(cursors: Phaser.Types.Input.Keyboard.CursorKeys, shiftKey: Phaser.Input.Keyboard.Key) {
        const body = this.body as Phaser.Physics.Arcade.Body;
        if (!body) return;

        body.setVelocity(0);
        const speed = shiftKey.isDown ? this.runSpeed : this.walkSpeed;

        if (cursors?.left?.isDown || this.wasd?.left?.isDown) {
            body.setVelocityX(-speed);
            this.anims.play('player-left', true);
        } else if (cursors?.right?.isDown || this.wasd?.right?.isDown) {
            body.setVelocityX(speed);
            this.anims.play('player-right', true);
        } else if (cursors?.up?.isDown || this.wasd?.up?.isDown) {
            body.setVelocityY(-speed);
            this.anims.play('player-up', true);
        } else if (cursors?.down?.isDown || this.wasd?.down?.isDown) {
            body.setVelocityY(speed);
            this.anims.play('player-down', true);
        } else {
            this.anims.stop();
            // Optional: reset to idle frame based on last direction
            // this.setFrame(1);
        }
    }
}
