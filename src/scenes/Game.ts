import { Scene } from 'phaser';
import Flappy from '../classes/Flappy'
import Base from '../classes/Base'
import Pipe from '../classes/Pipe'

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    msg_text : Phaser.GameObjects.Text;
    flappy: Flappy;
    base: Base;
    pipe: Pipe
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
        this.base = new Base(this, 512, 825, 'base') 
        this.base.setDisplaySize(512, 165)

        // // creates a pipe
        // const pipe = Pipe.generatePipes(this, 400, 384, 'pipe')
        // this.pipe.setScale(1.5)

        // creates the flappy bird
        this.flappy = new Flappy(this, 512, 384, 'flappy')
        this.flappy.setScale(1.5)

        // click to flap
        this.input.on('pointerdown', () => {
            this.flappy.flap();
        });
    }

    // Update accepts 2 arguments, so time is needed even if it is never called
    update(time: number, delta: number): void {
        // Update base with delta time
        //this.base.moveBase(delta)
        // this.pipe.update

        // update the Flappy bird with the time delta
        this.flappy.update(delta);
    }
}
