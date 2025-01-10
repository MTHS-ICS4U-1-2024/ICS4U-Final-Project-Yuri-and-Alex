import { Scene, GameObjects } from 'phaser';

export class MainMenu extends Scene
{
    background: GameObjects.Image;
    logo: GameObjects.Image;
    title: GameObjects.Text;

    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        this.background = this.add.image(512, 384, 'background');
        this.background.setScale(1.5);

        this.logo = this.add.image(512, 300, 'message');
        this.logo.setScale(1.5);

        this.input.once('pointerdown', () => {

            this.scene.start('Game');

        });
    }
}
