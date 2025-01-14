import Phaser from 'phaser';

export default class Base extends Phaser.GameObjects.Sprite {
  private positionX: number;
  private positionY: number;
  private velocityX: number;
  private startingX: number;

// scene is to there to be able to generate the sprite. x and y are the sprites coordinates, texture is the sprite image.
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);
    scene.add.existing(this);

    // Initialize properties
    this.positionX = 0; // Horizontal position
    this.positionY = 700; // Vertical position
    this.velocityX = 300; // Horizontal Velocity 
    this.startingX = this.x 
  }

  // Update position and apply gravity
  moveBase(delta: number): void {
    // Convert delta (time since last frame) to seconds
    const deltaSeconds = delta / 1000;

    // Update the base's position
    this.x -= this.velocityX * deltaSeconds;
    
    if(this.x <= 226) {
      this.x = this.startingX
    }
  }
}