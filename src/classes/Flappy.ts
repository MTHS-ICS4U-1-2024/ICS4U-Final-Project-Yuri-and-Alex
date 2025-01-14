import Phaser from 'phaser';

export default class Flappy extends Phaser.GameObjects.Sprite {
  private velocityY: number;
  private gravity: number;
  private terminalVelocity: number;
  private flapStrength: number;
  private textures: string[]
  private currentTextureIndex: number;
  private textureSwitchTimer: number;
  private isFlapping: boolean;
  private falling: boolean;
  private floatTime: number;
  private flapSound: Phaser.Sound.BaseSound;

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
    this.flapStrength = -450;
    // floats when idle
    this.floatTime = 0;

    // list of textures (flappy, flappy-up, flappy-down)
    this.textures = ['flappy', 'flappyup', 'flappydown'];
    this.currentTextureIndex = 0;

    // every 100ms, the textures cycle
    this.textureSwitchTimer = 100;

    // bird is idle initially
    this.isFlapping = false;
    this.falling = false;

    // set the bird's initial position to the middle of the screen
    this.setPosition(256, 360);

    // start animation cycle
    scene.time.addEvent({
      // set interval to switch textures
      delay: this.textureSwitchTimer,
      callback: this.cycleTexture,
      // ensure 'this' refers to the current Flappy instance
      callbackScope: this,
      loop: true
    });

    // listen for 'flap' on user input
    scene.input.on('pointerdown', this.flap, this);

    // loading flap sound
    this.flapSound = scene.sound.add('flap');
  }

  // cycle through the bird textures (flappy, flappyup, flappydown)
  private cycleTexture(): void {
    if (this.isFlapping) {
      this.setTexture(this.textures[this.currentTextureIndex]);
    // move to the next texture in the array, looping back to the start
      this.currentTextureIndex = (this.currentTextureIndex + 1) % this.textures.length;
    } else {
      // if bird is idle, sprite should be flappy
      this.setTexture(this.textures[0]);
    }
  }

  // call this to make the bird flap (go up)
  flap(): void {
    if (!this.falling) {
      this.falling = true;
    }

    this.velocityY = this.flapStrength;
    this.isFlapping = true;

    this.flapSound.play();
  }

  // update position and apply gravity
  update(delta: number): void {
    // convert delta (time since last frame) to seconds
    const deltaSeconds = delta / 1000;

    // apply gravity
    if (this.falling) {
    this.velocityY += this.gravity * deltaSeconds;

    // cap velocity at terminal velocity
    this.velocityY = Math.min(this.velocityY, this.terminalVelocity);

    // update the bird's position
    this.y += this.velocityY * deltaSeconds;

    // tilt the bird based on velocity
    // tilt up when flapping, tilt down when falling
    if (this.velocityY < 0) {
      // flapping (tilt up)
      this.rotation = -Math.min(Math.abs(this.velocityY) / 1000, 2);
    } else {
      // falling (tilt down)
      this.rotation = Math.min(this.velocityY / 1000, 2);
    }
  }

    // prevent bird from falling below the screen
    if (this.y > 600) {
      this.y = 600;
      // reset velocity upon collision with the ground
      this.velocityY = 0;
      // stop flapping
      this.isFlapping = false;
    }

  // add floating effect when idle (not flapping)
  if (!this.isFlapping) {
    this.floatTime += deltaSeconds * 4;
    this.y += Math.sin(this.floatTime) * 0.5;
  }
}
}
