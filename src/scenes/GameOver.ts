import { Scene } from 'phaser';

export class GameOver extends Scene
{
    background: Phaser.GameObjects.Image;
    restart: Phaser.GameObjects.Image;
    gameover: Phaser.GameObjects.Image;

    constructor ()
    {
        super('GameOver');
    }

    create () {
        this.background = this.add.image(256, 254, 'background');
        this.background.setDisplaySize(512, 1324);

        this.gameover = this.add.image(256, 300, 'gameover');
        this.gameover.setScale(1.5);

        this.restart = this.add.image(256, 400, 'playbutton');
        this.restart.setScale(0.3);

        // enable interactive mode on the restart button
        this.restart.setInteractive();

        // listen for pointerdown event only on the restart button
        this.restart.on('pointerdown', () => {
            this.scene.start('Game');
        });
    }
}
