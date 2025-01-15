import Phaser from 'phaser';

export default class Pipe extends Phaser.GameObjects.Sprite {
  // Properies for pipes
  private velocityX: number;
  private gapSize: number;
  protected scored: boolean = false;


// scene is to there to be able to generate the sprite
// x and y are the sprites coordinates, texture is the sprite image.
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);
    scene.add.existing(this);

    // initialize properties
    // horizontal velocity
    this.velocityX = 200;
    // size of the gap between pipes
    this.gapSize = 350;
  }

  // Static to be able to handle pipe generation from within the method
  static generatePipes(scene: Phaser.Scene, x: number, y: number, texture: string): [Pipe, Pipe] {
    const topPipe = new Pipe(scene, x, y, texture);
    const bottomPipe = new Pipe(scene, x, y + topPipe.height + topPipe.gapSize, texture);

    // Add pipes to the scene
    scene.add.existing(topPipe);
    topPipe.angle = 180
    topPipe.setScale(1.5)

    scene.add.existing(bottomPipe);
    bottomPipe.setScale(1.5)
    return [topPipe, bottomPipe];
  }

  // update position and apply gravity
  update(delta: number): void {
    // convert delta (time since last frame) to seconds
    const deltaSeconds = delta / 1000;

    // update the pipe's position
    this.x -= this.velocityX * deltaSeconds;

    // destroy if pipe is offscreen
    if (this.x > 0) {
      this.destroy
    }
  }
}