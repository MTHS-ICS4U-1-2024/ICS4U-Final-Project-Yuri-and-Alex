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

  // Call this to generate pipes. static so that the creation logic can be handled from within the method. 
  generatepPipe(scene: Phaser.Scene, x: number, y: number, texture: string): Pipe {
    const topPipe = new Pipe(scene, x, y, texture);
    const bottomPipe = new Pipe(scene, x, y + this.gapSize + topPipe.height, texture)
    
    // Add both pipes to the scene
    scene.add.existing(bottomPipe);
    scene.add.existing(topPipe);
    
    return topPipe
    return bottomPipe
  }

  // Update position and apply gravity
  update(delta: number): void {
    // Convert delta (time since last frame) to seconds
    const deltaSeconds = delta / 1000;

    // Update the pipe's position
    this.x += this.velocityX * deltaSeconds;

    // Destroy if offscreen
    if (this.x > 0) {
      this.destroy
    }
  }
}
