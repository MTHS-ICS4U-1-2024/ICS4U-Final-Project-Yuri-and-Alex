import { Scene } from 'phaser';
import Flappy from '../classes/Flappy';
import Base from '../classes/Base';
import Pipe from '../classes/Pipe';

export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    msg_text: Phaser.GameObjects.Text;
    flappy: Flappy;
    base1: Base;
    base2: Base;
    pipes: Pipe[] = []; // Array to store all pipes
    baseSpeed: number = 150;

    constructor() {
        super('Game');
    }

    create() {
        console.log('Creating game objects...');

        // Creates background
        this.background = this.add.image(256, 254, 'background');
        this.background.setDisplaySize(512, 1324);

        // Creates the ground (base) remember 825
        this.base1 = new Base(this, 128, 700, 'base');
        this.base1.setDisplaySize(576, 165);
        this.base2 = new Base(this, 640, 700, 'base');
        this.base2.setDisplaySize(576, 165);

        // Creates a pipe pair and stores them in the pipes array
        

        // Creates the flappy bird
        this.flappy = new Flappy(this, 128, 384, 'flappy');
        this.flappy.setScale(1.5);

        // Click to flap
        this.input.on('pointerdown', () => {
            this.flappy.flap();
        });

        // Schedule pipe generation at fixed intervals
        this.time.addEvent({
            delay: 2000, // Generate pipes every 2 seconds
            loop: true,
            // callback is part of the addEvent configuraiton. Used to specify the method that is called
            callback: () => {
                const [topPipe, bottomPipe] = Pipe.generatePipes(this, 700, 0, 'pipe');
                this.pipes.push(topPipe, bottomPipe);
            },
        });
    }

    // Update accepts 2 arguments, so time is needed even if it is never called
    update(time: number, delta: number): void {
        // Update base with delta time
        this.base1.moveBase(delta);
        this.base2.moveBase(delta);

        // Update pipes
        this.pipes.forEach((pipe) => pipe.update(delta));

        // Remove pipes that are offscreen. Filter allows only pipes that are offscreen to be removed
        this.pipes = this.pipes.filter((pipe) => pipe.x > -pipe.width);

        // Update the flappy bird with the time delta
        this.flappy.update(delta);
    }
}
