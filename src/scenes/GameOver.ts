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

        this.gameover = this.add.image(512, 250, 'gameover');
        this.gameover.setScale(1.5);

        this.restart = this.add.image(512, 400, 'playbutton');
        this.restart.setScale(2);

        // enable interactive mode on the restart button
        this.restart.setInteractive();

        // listen for pointerdown event only on the restart button
        this.restart.on('pointerdown', () => {
            this.scene.start('MainMenu');
        });
    }
}
