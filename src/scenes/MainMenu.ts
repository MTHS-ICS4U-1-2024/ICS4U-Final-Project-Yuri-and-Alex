import { Scene, GameObjects } from 'phaser';
import Base from '../classes/Base';
import Flappy from '../classes/Flappy';

export class MainMenu extends Scene
{
    background: GameObjects.Image;
    startmsg: GameObjects.Image;
    title: GameObjects.Text;
    base: Base;
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

        // creates the ground (base) remember 825
        this.base = new Base(this, 512, 700, 'base');
        this.base.setDisplaySize(1024, 165);
        this.base.setDepth(1)

        // message
        this.startmsg = this.add.image(256, 310, 'message');
        this.startmsg.setScale(1.5);

        this.flappy = new Flappy(this, 512, 384, 'flappy');
        this.flappy.setScale(1.5);

        this.input.once('pointerdown', () =>
                this.scene.start('Game'));
    }

    // Update accepts 2 arguments, so time is needed even if it is never called
    update(time: number, delta: number): void {
        // update base with delta time
        this.base.moveBase(delta);

        // Update the flappy bird with the time delta
        this.flappy.update(delta);
    }
}
