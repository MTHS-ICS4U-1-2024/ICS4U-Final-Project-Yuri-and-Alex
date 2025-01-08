import { Scene } from 'phaser';
import Flappy from '../classes/Flappy'

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    msg_text : Phaser.GameObjects.Text;
    flappy: Flappy;
    base: Phaser.GameObjects.Image;
    baseSpeed: number = 150;

    constructor ()
    {
        super('Game');
    }

    create () {
        console.log('Creating game objects...');

        // creates background
        this.background = this.add.image(512, 384, 'background');
        this.background.setScale(1.5)

        // creating the ground (base)
        this.base = this.add.image(512, 700, 'base')
        this.base.setScale(1.5)

        // creates the flappy bird
        this.flappy = new Flappy(this, 512, 384, 'flappy')
        this.flappy.setScale(1.5)

        // click to flap
        this.input.on('pointerdown', () => {
            this.flappy.flap();
        });
    }

    // temporarily commented out as the code doesnt work
    update(time: number, delta: number): void {
        // if (this.base) {
            // move the base to the left
            // this.base.x -= this.baseSpeed * (delta / 1000000);

            // If the base goes off the left side of the screen, reset its position
            // if (this.base.x < - this.base.width / 2) {
                // Reset position to the right side, no delta time needed for this
                // this.base.x = 512 + this.base.width / 2;
                // console.log('Base reset to the right side');
            // }

            // debugging log for the base's position
            // console.log(`Base X position: ${this.base.x}`);
        // } else {
            // console.error('Base object is not initialized!');
        // }
        
        // update the Flappy bird with the time delta
        this.flappy.update(delta);
    }
}
