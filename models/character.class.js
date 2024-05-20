/**
 * Represents the main character in the game.
 * This class manages the character's animations, movements, and interactions within the game environment.
 * The character has multiple states represented by different animations such as walking, jumping, being hurt, and idling.
 *
 * @extends MovableObject  Inherits methods and properties from the MovableObject class,
 *                         which includes movement capabilities and image handling.
 */
class Character extends MovableObject {
  height = 250;
  width = 100;
  y = 170;
  speed = 4;
  lastCharacterAction;

  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  IMAGES_LONG_IDLE = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  world;
  sound = [
    (this.walking_sound = new Audio("audio/running.mp3")),
    (this.jumping_sound = new Audio("audio/jump.mp3")),
    (this.snoring_sound = new Audio("audio/snoring.mp3")),
    (this.hurt_sound = new Audio("audio/hurt.mp3")),
  ];
  /**
   * Constructs the main character.
   * Loads all necessary images for the character's animations and sets initial properties.
   */
  constructor() {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.applyGravity();
    this.offset = {
      top: 100,
      left: 20,
      right: 30,
      bottom: 10,
    };
    this.addAudioToArray(this.sound);
    this.measureLastCharacterAction();
  }
  /**
   * Manages animation states of the character based on its activity.
   */
  animate() {
    setInterval(() => {
      this.showIdleAnimation();
    }, 250);

    setInterval(() => {
      this.moveCharacter();
    }, 1000 / 60);

    setInterval(() => {
      this.animationForCharacter();
      console.log(this.speedY);
    }, 150);
  }
  /**
   * Causes the character to jump by setting the vertical speed.
   */
  jump() {
    this.speedY = 25;
    if (this.speedY > 0) {
      this.currentImage = 0;
    } else if (this.speedY <= 0) {
      this.currentImage = 4;
    }
  }
  /**
   * Displays idle animation sequences based on how long the character has been idle.
   */
  showIdleAnimation() {
    if (
      !this.world.keyboard.LEFT ||
      !this.world.keyboard.RIGHT ||
      !this.world.keyboard.UP ||
      !this.world.keyboard.D
    ) {
      if (this.calculateElapsedTime() > 5) {
        this.playAnimation(this.IMAGES_LONG_IDLE);
      } else if (this.calculateElapsedTime() > 0.2) {
        this.playAnimation(this.IMAGES_IDLE);
      }
    }
  }
  /**
   * Handles character movement and orientation based on keyboard inputs.
   */
  moveCharacter() {
    this.walking_sound.pause();
    this.moveCharacterRight();
    this.moveCharacterLeft();
    this.jumpCharacter();
    this.world.camera_x = -this.x + 100;
  }
  /**
   * the character jups and plays the jump sound.
   * last action of character gets measured vor the idle animation
   */
  jumpCharacter() {
    if (this.world.keyboard.SPACE == true && !this.isAboveGround()) {
      this.jumping_sound.currentTime = 0;
      this.jumping_sound.play();
      this.jump();
      this.measureLastCharacterAction();
    }
  }

  /**
   * moves character to the right and plays the walking sound.
   * last action of character gets measured vor the idle animation
   */
  moveCharacterRight() {
    if (
      this.world.keyboard.RIGHT == true &&
      this.x < this.world.level.level_end_x
    ) {
      this.moveRight();
      this.walking_sound.play();
      this.otherDirection = false;
      this.measureLastCharacterAction();
    }
  }
  /**
   * moves character to the left and plays the walking sound.
   * last action of character gets measured vor the idle animation
   */
  moveCharacterLeft() {
    if (this.world.keyboard.LEFT == true && this.x > 0) {
      this.moveLeft();
      this.walking_sound.play();
      this.otherDirection = true;
      this.measureLastCharacterAction();
    }
  }
  /**
   * Determines and sets the appropriate animation based on the character's state.
   */
  animationForCharacter() {
    if (this.isDead()) {
      this.playAnimation(this.IMAGES_DEAD);
    } else if (this.isHurt()) {
      this.hurt_sound.play();
      this.playAnimation(this.IMAGES_HURT);
    } else if (
      (this.world.keyboard.RIGHT == true || this.world.keyboard.LEFT) &&
      !this.isAboveGround()
    ) {
      this.playAnimation(this.IMAGES_WALKING);
    }
    if (this.isAboveGround()) {
      this.playAnimation(this.IMAGES_JUMPING);
    }
  }
}
