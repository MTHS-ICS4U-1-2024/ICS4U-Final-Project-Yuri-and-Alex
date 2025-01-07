import { Scene } from 'phaser';
import Flappy from '../classes/Flappy'

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    msg_text : Phaser.GameObjects.Text;
    flappy: Flappy

    constructor ()
    {
        super('Game');
    }

    create ()
    {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);

        this.background = this.add.image(512, 384, 'background');
        this.background.setAlpha(0.5);
        this.background.setScale(1.5)

        this.flappy = new Flappy(this, 512, 384, 'flappy')

        this.input.on('pointerdown', () => {
            this.flappy.flap();
        });
    }

    update(time: number, delta: number): void {
        // Update the Flappy bird with the time delta
        this.flappy.update(delta);
    }
}
