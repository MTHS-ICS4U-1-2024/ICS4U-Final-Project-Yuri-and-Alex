import Phaser from 'phaser';

export default class Pipe extends Phaser.GameObjects.Sprite {
  private positionX: number;
  private positionY: number;
  private velocityX: number;
  private gapSize: number;

// scene is to there to be able to generate the sprite. x and y are the sprites coordinates, texture is the sprite image.
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);
    scene.add.existing(this);

    // Initialize properties
    this.positionX = 0; // Horizontal position
    this.positionY = 0; // Vertical position
    this.velocityX = 500; // Horizontal Velocity  
    this.gapSize = 300; // Size of the gap between pipes
  }

  static generatePipes(scene: Phaser.Scene, x: number, y: number, texture: string): [Pipe, Pipe] {
    const topPipe = new Pipe(scene, x, y, texture);
    const bottomPipe = new Pipe(scene, x, y + topPipe.height + topPipe.gapSize, texture);

    // Add pipes to the scene
    scene.add.existing(topPipe);
    scene.add.existing(bottomPipe);

    return [topPipe, bottomPipe];
  }

  update(delta: number): void {
    const deltaSeconds = delta / 1000;

    // Move pipe to the left
    this.x += this.velocityX * deltaSeconds;

    // Destroy pipe if offscreen
    if (this.x + this.width < 0) {
      this.destroy();
    }
  }
}