import Phaser from 'phaser';

export default class Pipe extends Phaser.GameObjects.Sprite {
  private positionX: number;
  private positionY: number;
  private velocityX: number;
  private gapSize: number;

// scene is to there to be able to generate the sprite
// x and y are the sprites coordinates, texture is the sprite image.
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);
    scene.add.existing(this);

    // initialize properties
    // horizontal position
    this.positionX = 0;
    // vertical position
    this.positionY = 0;
    // horizontal velocity
    this.velocityX = 500;
    // size of the gap between pipes
    this.gapSize = 300;
  }

  // call this to generate pipes
  generatepPipe(scene: Phaser.Scene, x: number, y: number, texture: string): Pipe {
    const topPipe = new Pipe(scene, x, y, texture);
    const bottomPipe = new Pipe(scene, x, y + this.gapSize + topPipe.height, texture)
    
    // add both pipes to the scene
    scene.add.existing(bottomPipe);
    scene.add.existing(topPipe);
    
    return topPipe
    return bottomPipe
  }

  // update position and apply gravity
  update(delta: number): void {
    // convert delta (time since last frame) to seconds
    const deltaSeconds = delta / 1000;

    // update the pipe's position
    this.x += this.velocityX * deltaSeconds;

    // destroy if pipe is offscreen
    if (this.x > 0) {
      this.destroy
    }
  }
}
