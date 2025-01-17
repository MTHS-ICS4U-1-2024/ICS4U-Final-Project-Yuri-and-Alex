import { Scene } from 'phaser';
import Base from '../classes/Base';

export class GameOver extends Scene {
    background: Phaser.GameObjects.Image;
    restart: Phaser.GameObjects.Image;
    gameover: Phaser.GameObjects.Image;
    base: Base;
    highScoreDigits: Phaser.GameObjects.Image[] = [];
    scoreDigits: Phaser.GameObjects.Image[] = [];

    constructor() {
        super('GameOver');
    }

    create() {
        // Create background
        this.background = this.add.image(256, 254, 'background');
        this.background.setDisplaySize(512, 1324);

        // Create the ground (base)
        this.base = new Base(this, 512, 700, 'base');
        this.base.setDisplaySize(1024, 165);
        this.base.setDepth(1);

        // Add "Game Over" text and move it up a little
        this.gameover = this.add.image(256, 150, 'gameover'); // Adjusted position
        this.gameover.setScale(1.5);

        // Access the scores from the Game scene
        const gameScene = this.scene.get('Game');
        const highScore = gameScene ? gameScene.highScore : 0;
        const score = gameScene ? gameScene.score : 0;

        // Display the high score and regular score
        this.displayScore("Highscore", highScore, 250);
        this.displayScore("Score", score, 350);

        // Add restart button below the scores
        this.restart = this.add.image(256, 500, 'playbutton'); // Adjusted position
        this.restart.setScale(0.3);
        this.restart.setInteractive();

        // Restart the game on click
        this.restart.on('pointerdown', () => {
            this.scene.start('Game');
        });
    }

    private displayScore(label: string, score: number, yPosition: number): void {
        // Add the label text above the score
        const labelText = this.add.text(256, yPosition - 30, label.toUpperCase(), {
            fontFamily: '"Press Start 2P", sans-serif',
            fontSize: '32px',
            color: '#ff914d',
            fontStyle: 'bold',
        });
        labelText.setOrigin(0.5, 0.5); // Center the text

        // Clear any existing score digits (for reuse if necessary)
        if (label === "Highscore") {
            this.highScoreDigits.forEach((digit) => digit.destroy());
            this.highScoreDigits = [];
        } else {
            this.scoreDigits.forEach((digit) => digit.destroy());
            this.scoreDigits = [];
        }

        // Convert the score to a string and calculate its position
        const scoreString = score.toString();
        let xOffset = 256 - (scoreString.length * 20) / 2; // Center the digits horizontally

        // Create an image for each digit
        for (const char of scoreString) {
            const digitImage = this.add.image(
                xOffset,
                yPosition,
                char === '0' ? 'zero' :
                char === '1' ? 'one' :
                char === '2' ? 'two' :
                char === '3' ? 'three' :
                char === '4' ? 'four' :
                char === '5' ? 'five' :
                char === '6' ? 'six' :
                char === '7' ? 'seven' :
                char === '8' ? 'eight' :
                'nine'
            );

            digitImage.setOrigin(0.5, 0.5); // Center the digits
            if (label === "Highscore") {
                this.highScoreDigits.push(digitImage);
            } else {
                this.scoreDigits.push(digitImage);
            }

            // Space out the digits
            xOffset += digitImage.width + 5;
        }
    }
}
