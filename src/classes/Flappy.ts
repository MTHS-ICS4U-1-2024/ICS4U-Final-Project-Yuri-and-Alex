import Phaser from 'phaser';

export default class Flappy extends Phaser.GameObjects.Sprite {
  private velocityY: number;
  private gravity: number;
  private terminalVelocity: number;
  private flapStrength: number;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);
    scene.add.existing(this);

    // Initialize properties
    this.velocityY = 0; // Vertical velocity
    this.gravity = 500; // Pixels per second squared
    this.terminalVelocity = 1000; // Max falling speed
    this.flapStrength = -300; // Upward force
  }

  // Call this to make the bird flap
  flap(): void {
    this.velocityY = this.flapStrength;
  }

  // Update position and apply gravity
  update(delta: number): void {
    // Convert delta (time since last frame) to seconds
    const deltaSeconds = delta / 1000;

    // Apply gravity
    this.velocityY += this.gravity * deltaSeconds;

    // Cap the velocity at terminal velocity
    this.velocityY = Math.min(this.velocityY, this.terminalVelocity);

    // Update the bird's position
    this.y += this.velocityY * deltaSeconds;

    // Prevent bird from falling below the screen
    if (this.y > 600) {
      this.y = 600;
      this.velocityY = 0; // Reset velocity upon collision with the ground
    }
  }
}
