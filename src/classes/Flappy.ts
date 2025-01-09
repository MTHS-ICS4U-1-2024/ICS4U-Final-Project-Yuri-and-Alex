import Phaser from 'phaser';

export default class Flappy extends Phaser.GameObjects.Sprite {
  private velocityY: number;
  private gravity: number;
  private terminalVelocity: number;
  private flapStrength: number;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);
    scene.add.existing(this);

    // initialize properties
    // vertical velocity
    this.velocityY = 0;
    // pixels per second squared
    this.gravity = 1500;
    // max falling speed
    this.terminalVelocity = 1100;
    // upward force
    this.flapStrength = -400;
  }

  // call this to make the bird flap
  flap(): void {
    this.velocityY = this.flapStrength;
  }

  // update position and apply gravity
  update(delta: number): void {
    // convert delta (time since last frame) to seconds
    const deltaSeconds = delta / 1000;

    // apply gravity
    this.velocityY += this.gravity * deltaSeconds;

    // cap velocity at terminal velocity
    this.velocityY = Math.min(this.velocityY, this.terminalVelocity);

    // update the bird's position
    this.y += this.velocityY * deltaSeconds;

    // prevent bird from falling below the screen
    if (this.y > 600) {
      this.y = 600;
      // reset velocity upon collision with the ground
      this.velocityY = 0;
    }
  }
}
