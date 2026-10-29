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
            (this.body as Phaser.Physics.Arcade.Body).setSize(24, 24);
            (this.body as Phaser.Physics.Arcade.Body).setOffset(20, 36);
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
            // Reset to the idle frame (frame 0 of the current animation row)
            if (this.anims.currentAnim) {
                // The idle frame is one less than the start frame of walking
                const startFrame = (this.anims.currentAnim.frames[0].frame.name as number) - 1;
                this.setFrame(startFrame);
            } else {
                this.setFrame(0);
            }
        }
    }
}
