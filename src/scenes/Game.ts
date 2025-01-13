import { Scene } from 'phaser';
import Flappy from '../classes/Flappy';
import Base from '../classes/Base';
import Pipe from '../classes/Pipe';

export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    msg_text: Phaser.GameObjects.Text;
    flappy: Flappy;
    base: Base;
    pipes: Pipe[] = []; // Array to store all pipes
    baseSpeed: number = 150;

    constructor() {
        super('Game');
    }

    create() {
        console.log('Creating game objects...');

        // Creates background
        this.background = this.add.image(512, 384, 'background');
        this.background.setDisplaySize(576, 1024);

        // Creates the ground (base) remember 825
        this.base = new Base(this, 512, 700, 'base');
        this.base.setDisplaySize(576, 165);

        // Creates a pipe pair and stores them in the pipes array
        const [topPipe, bottomPipe] = Pipe.generatePipes(this, 700, 0, 'pipe');
        this.pipes.push(topPipe, bottomPipe);

        // Creates the flappy bird
        this.flappy = new Flappy(this, 512, 384, 'flappy');
        this.flappy.setScale(1.5);

        // Click to flap
        this.input.on('pointerdown', () => {
            this.flappy.flap();
        });
    }

    // Update accepts 2 arguments, so time is needed even if it is never called
    update(time: number, delta: number): void {
        // Update base with delta time
        this.base.moveBase(delta);

        // Update pipes
        this.pipes.forEach((pipe) => pipe.update(delta));

        // Remove pipes that are offscreen. Filter allows only pipes that are offscreen to be removed
        this.pipes = this.pipes.filter((pipe) => pipe.x > -pipe.width);

        // Update the flappy bird with the time delta
        this.flappy.update(delta);
    }
}
