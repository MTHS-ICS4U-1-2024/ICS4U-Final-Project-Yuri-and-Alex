import { Scene, GameObjects } from 'phaser';
import Base from '../classes/Base';
import Flappy from '../classes/Flappy';

export class MainMenu extends Scene
{
    background: GameObjects.Image;
    logo: GameObjects.Image;
    title: GameObjects.Text;
    base: Base;
    flappy: Flappy;

    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        this.background = this.add.image(512, 384, 'background');
        this.background.setScale(1.5);

        this.logo = this.add.image(512, 309, 'message');
        this.logo.setScale(1.5);

        this.base = new Base(this, 512, 700, 'base');
        this.base.setDisplaySize(576, 165);

        this.flappy = new Flappy(this, 512, 384, 'flappy');
        this.flappy.setScale(1.5);

        this.input.once('pointerdown', () => {

            this.scene.start('Game');

        });
    }

    // Update accepts 2 arguments, so time is needed even if it is never called
    update(time: number, delta: number): void {
        // Update the flappy bird with the time delta
        this.flappy.update(delta);
    }
}
