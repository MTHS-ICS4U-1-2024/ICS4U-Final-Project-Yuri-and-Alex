import { Scene } from 'phaser';
import Flappy from '../classes/Flappy';
import Base from '../classes/Base';
import Pipe from '../classes/Pipe';
 
export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    flappy: Flappy;
    base: Base;
    pipes: Pipe[] = [];
    baseSpeed: number = 150;
    startTime: number = 0;
    score: number = 0;
    scoreDigits: Phaser.GameObjects.Image[]  =[];
    pipeTimer: Phaser.Time.TimerEvent | null = null;
    highScore: number = 0;

    constructor() {
        super('Game');
    }

    create() {
        console.log('Creating game objects...');

        // creates background
        this.background = this.add.image(256, 254, 'background');
        this.background.setDisplaySize(512, 1324);

        // creates the ground (base) remember 825
        this.base = new Base(this, 512, 700, 'base');
        this.base.setDisplaySize(1024, 165);
        this.base.setDepth(1)

        // creates the flappy bird
        this.flappy = new Flappy(this, 128, 384, 'flappy');
        this.flappy.setScale(1.5);

        // initialize the score digits (initially empty)
        this.scoreDigits = [];
        this.updateScoreDisplay();

        // click to flap
        this.input.on('pointerdown', () => {
            this.flappy.flap();
        });

        // schedule pipe generation at fixed intervals
        this.pipeTimer = this.time.addEvent({
            // generate pipes every 2 seconds
            delay: 1500,
            loop: true,
            // callback is part of the addEvent configuration. Used to specify the method that is called
            callback: () => {
                const [topPipe, bottomPipe] = Pipe.generatePipes(this, 700, Phaser.Math.Between(-175, 175), 'pipe');
                this.pipes.push(topPipe, bottomPipe);
            },
        });
    }

    // update accepts 2 arguments, so time is needed even if it is never called
    update(time: number, delta: number): void {
        // update base with delta time
        this.base.moveBase(delta);

        // update pipes
        this.pipes.forEach((pipe) => pipe.update(delta));

        // remove pipes that are offscreen
        // filter allows only pipes that are offscreen to be removed
        this.pipes = this.pipes.filter((pipe) => pipe.x > -pipe.width);

        // update the flappy bird with the time delta
        this.flappy.update(delta);
        console.log(this.flappy.y)

        // check for collision
        this.checkCollisions();

        // check to update score
        this.checkScore();
    }

        // custom collision detection method
    private checkCollisions(): void {
        // check for collision with pipes
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

    // helper method to check for collisions
    private isColliding(obj1: Phaser.GameObjects.Sprite, obj2: Phaser.GameObjects.Sprite): boolean {
        const obj1Bounds = obj1.getBounds();
        const obj2Bounds = obj2.getBounds();

        return Phaser.Geom.Intersects.RectangleToRectangle(obj1Bounds, obj2Bounds);
    }

    // handle game over logic
    private gameOver(): void {
        console.log('Game Over!');
        // Play death sounds
        this.sound.play('hit');
        this.sound.play('death');
    
        // Stop the game scene
        this.scene.stop('Game');
    
        // Destroy all pipes
        this.pipes.forEach((pipe) => pipe.destroy());
        this.pipes = [];
    
        // Stop the generation timer
        if (this.pipeTimer) {
            this.pipeTimer.remove();
            this.pipeTimer = null;
        }
    
        // Calculate the high score
        this.highScore = Math.max(this.highScore, this.score);
    
        // Transition to the GameOver scene, passing score and highScore as data
        this.scene.start('GameOver', {
            score: this.score,
            highScore: this.highScore,
        });
    
        // Reset the score
        this.score = 0;
    }
    

    // check if the flappy bird has passed a pipe (for scoring)
    private checkScore(): void {
        this.pipes.forEach((pipe) => {
            if (pipe.x + pipe.width < this.flappy.x && !pipe['scored']) {
                this.score += 0.5;
                this.updateScoreDisplay();
                pipe['scored'] = true;

                // play sound
                this.sound.play('point');
            }
        });
    }

    // update the score display using images for digits
    private updateScoreDisplay(): void {
        // clear the previous score display (remove old images)
        this.scoreDigits.forEach((digit) => digit.destroy());
        this.scoreDigits = [];

        // convert the score to a string and loop over each digit
        const scoreString = Math.floor(this.score).toString();

        // position the digits horizontally, each digit is an image
        let xOffset = 16;
        for (let i = 0; i < scoreString.length; i++) {
            const digit = scoreString[i];
            // go through every single image 1 by 1
            const scoreImage = this.add.image(xOffset, 16, digit === '0' ? 'zero' :
                digit === '1' ? 'one' :
                digit === '2' ? 'two' :
                digit === '3' ? 'three' :
                digit === '4' ? 'four' :
                digit === '5' ? 'five' :
                digit === '6' ? 'six' :
                digit === '7' ? 'seven' :
                digit === '8' ? 'eight' :
                'nine');
            // align the image properly (top-left)
            scoreImage.setOrigin(0, 0);
            this.scoreDigits.push(scoreImage);
            // add a small space between digits
            xOffset += scoreImage.width + 5;
        }
    }
}
