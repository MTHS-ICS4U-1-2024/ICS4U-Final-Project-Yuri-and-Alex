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
    startTime: number = 0


    constructor() {
        super('Game');
    }

    create() {
        console.log('Creating game objects...');

        // Creates background
        this.background = this.add.image(256, 254, 'background');
        this.background.setDisplaySize(512, 1324);

        // Creates the ground (base) remember 825
        this.base = new Base(this, 512, 700, 'base');
        this.base.setDisplaySize(1024, 165);
        this.base.setDepth(1)


        // Creates the flappy bird
        this.flappy = new Flappy(this, 128, 384, 'flappy');
        this.flappy.setScale(1.5);

        // Click to flap
        this.input.on('pointerdown', () => {
            this.flappy.flap();
        });

        // Schedule pipe generation at fixed intervals
        this.time.addEvent({
            delay: 1500, // Generate pipes every 2 seconds
            loop: true,
            // callback is part of the addEvent configuraiton. Used to specify the method that is called
            callback: () => {
                const [topPipe, bottomPipe] = Pipe.generatePipes(this, 700, Phaser.Math.Between(-200, 200), 'pipe');
                this.pipes.push(topPipe, bottomPipe);
            },
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
        console.log(this.flappy.y)

        this.checkCollisions();
    }

        // Custom collision detection method
    private checkCollisions(): void {
        // Check for collision with pipes
        this.pipes.forEach((pipe) => {
            if (this.isColliding(this.flappy, pipe)) {
                console.log('Collision with pipe!');
                this.gameOver();
                pipe.destroy()
            }
        });

        // Check for collision with the base
        if (this.isColliding(this.flappy, this.base)) {
            console.log('Collision with base!');
            this.gameOver();
        }
    }

    // Helper method to check for collisions
    private isColliding(obj1: Phaser.GameObjects.Sprite, obj2: Phaser.GameObjects.Sprite): boolean {
        const obj1Bounds = obj1.getBounds();
        const obj2Bounds = obj2.getBounds();

        return Phaser.Geom.Intersects.RectangleToRectangle(obj1Bounds, obj2Bounds);
    }

    // Handle game over logic
    private gameOver(): void {
        console.log('Game Over!');
        // Stop the scene or transition to a Game Over screen
        this.scene.start('GameOver') 
    }
}
