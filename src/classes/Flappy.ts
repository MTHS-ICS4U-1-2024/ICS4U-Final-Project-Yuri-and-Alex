import Phaser from 'phaser';

export default class Flappy extends Phaser.GameObjects.Sprite {
  private velocityY: number;
  private gravity: number;
  private terminalVelocity: number;
  private flapStrength: number;
  private textures: string[]
  private currentTextureIndex: number;
  private textureSwitchTimer: number;

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

    // list of textures (flappy, flappy-up, flappy-down)
    this.textures = ['flappy', 'flappyup', 'flappydown'];
    this.currentTextureIndex = 0;

    // every 150ms, the textures cycle
    this.textureSwitchTimer = 150;

    // start animation cycle
    scene.time.addEvent({
      // set interval to switch textures
      delay: this.textureSwitchTimer,
      callback: this.cycleTexture,
      // ensure 'this' refers to the current Flappy instance
      callbackScope: this,
      loop: true
    });
  }

  // cycle through the bird textures (flappy, flappyup, flappydown)
  private cycleTexture(): void {
    // update the texture of the sprite based on the current index
    this.setTexture(this.textures[this.currentTextureIndex]);

    // move to the next texture in the array, looping back to the start
    this.currentTextureIndex = (this.currentTextureIndex + 1) % this.textures.length;
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
