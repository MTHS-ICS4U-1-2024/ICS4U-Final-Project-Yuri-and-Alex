import { Scene } from 'phaser';

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }

    init ()
    {
        //  We loaded this image in our Boot Scene, so we can display it here
        this.add.image(512, 384, 'background');

        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(512-230, 384, 4, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress: number) => {

            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + (460 * progress);

        });
    }

    preload ()
    {
        //  loading assets
        this.load.setPath('assets');
        this.load.image('logo', 'logo.png');
        this.load.image('flappy', 'flappy.png')
        this.load.image('flappydown', 'flappy-down.png')
        this.load.image('flappyup', 'flappy-up.png')
        this.load.image('gameover', 'gameover.png')
        this.load.image('base', 'base.png')
        this.load.image('pipe', 'pipe.png')
        this.load.image('message', 'startmsg.png')
        this.load.image('playbutton', 'restart.png')
        this.load.image('zero', '0.png')
        this.load.image('one', '1.png');
        this.load.image('two', '2.png');
        this.load.image('three', '3.png');
        this.load.image('four', '4.png');
        this.load.image('five', '5.png');
        this.load.image('six', '6.png');
        this.load.image('seven', '7.png');
        this.load.image('eight', '8.png');
        this.load.image('nine', '9.png');
        this.load.image('scoreBg', 'scorebg.png')


        // loading audio
        this.load.audio('flap', 'flap.ogg')
        this.load.audio('point', 'point.ogg')
        this.load.audio('death', 'die.ogg')
        this.load.audio('hit', 'hit.ogg')

        this.load.once('complete', () => {
            console.log('All assets loaded!')
        })
    }

    create ()
    {
        //  moves to Game scene
        this.scene.start('MainMenu');
    }
}
