/**
 * Represents a throwable object, such as a bottle, within the game. This class extends `MovableObject`
 * to include throwing mechanics and collision detection specific to objects that can be thrown by a player or NPC.
 *
 * @extends MovableObject
 */
class ThrowableObject extends MovableObject {
  IMAGES_BOTTLE_THROWING = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGES_BOTTLE_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];
  sound = [
    (this.throw_sound = new Audio("audio/throw.mp3")),
    (this.splash_sound = new Audio("audio/breaking_bottle.mp3")),
  ];
  /**
   * Creates an instance of a throwable object with specific properties for throwing dynamics and animations.
   * @param {number} x - The initial x-coordinate of the object.
   * @param {number} y - The initial y-coordinate of the object.
   * @param {boolean} otherDirection - Indicates whether the object is thrown in the opposite direction of the player.
   * @param {World} world - The game world context in which the object interacts.
   */
  constructor(x, y, otherDirection, world) {
    super();
    this.loadImage("img/6_salsa_bottle/salsa_bottle.png");
    this.loadImages(this.IMAGES_BOTTLE_THROWING);
    this.loadImages(this.IMAGES_BOTTLE_SPLASH);
    this.addAudioToArray(this.sound);
    this.height = 70;
    this.width = 70;
    this.x = x;
    this.y = y;
    this.otherDirection = otherDirection;
    this.world = world;
    this.offset = {
      top: 20,
      left: 25,
      right: 25,
      bottom: 20,
    };

    this.throw();
    this.hit = false;
  }

  /**
   * Initiates the motion of the throwable object, applying physics and controlling the trajectory based on direction.
   * Also handles the logic to transition from throwing to impact animations.
   */
  throw() {
    this.speedY = 20;
    this.speedX = 10;
    if (!globalMute) {
      this.throw_sound.play();
    }
    this.applyGravity();
    setInterval(() => {
     this.animation();
    }, 25);
  }
/**
 * includes animations for throw and splash bottle
 */
  animation() {
    if (this.otherDirection) {
      this.x -= this.speedX;
    } else {
      this.x += this.speedX;
    }
    if (this.y == 377.5 || this.hit) {
      this.speedY = 0;
      this.speedX = 0;
      this.splashAnimation();
    } else {
      this.playAnimation(this.IMAGES_BOTTLE_THROWING);
    }
  }

  /**
   * Plays the splash animation sequence when the throwable object impacts another object or the ground,
   * and schedules the removal of the object from the world after the animation.
   */
  splashAnimation() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
    }, 100);
    setTimeout(() => {
      this.world.removeThrowableObject(this);
    }, 600);
  }
}
