import { Scene, GameObjects } from 'phaser';
import Base from '../classes/Base';
import Flappy from '../classes/Flappy';

export class MainMenu extends Scene
{
    background: GameObjects.Image;
    logo: GameObjects.Image;
    title: GameObjects.Text;
    base1: Base;
    base2: Base;
    flappy: Flappy;

    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        // Creates background
        this.background = this.add.image(256, 254, 'background');
        this.background.setDisplaySize(512, 1324);

        // Creates the ground (base) remember 825
        this.base1 = new Base(this, 128, 700, 'base');
        this.base1.setDisplaySize(576, 165);
        this.base2 = new Base(this, 640, 700, 'base');
        this.base2.setDisplaySize(576, 165);

        this.logo = this.add.image(256, 310, 'message');
        this.logo.setScale(1.5);

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
