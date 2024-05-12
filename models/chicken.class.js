/**
 * Represents a standard chicken enemy in the game.
 * This class manages the chicken's animations, movements, and interactions within the game environment,
 * such as walking and dying. It is one of the basic enemies the player will encounter.
 *
 * @extends MovableObject  Inherits methods and properties from the MovableObject class,
 *                         which includes movement capabilities and image handling.
 */
class Chicken extends MovableObject {
  y = 370;
  height = 50;
  width = 80;
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];
  isDead = false;
  sound = [(this.chicken_dead = new Audio("audio/chicken-dead.mp3"))];
  /**
   * Constructs a new chicken object.
   * The chicken is placed at a random horizontal position within a specified range to ensure variability in gameplay.
   */
  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.x = 600 + Math.random() * 1400;
    this.speed = 0.15 + Math.random() * 0.35;
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.animate();
    this.health = 1;
    this.offset = {
      top: 5,
      left: 5,
      right: 5,
      bottom: 0,
    };
    this.addAudioToArray(this.sound);
  }
  /**
   * Initiates and manages the animation loop for the chicken object.
   * Handles walking and death animations based on the chicken's health.
   */
  animate() {
    this.animations();
    this.walkAnimation();
  }
  /**
   * Manages the transition between animations based on the chicken's health status.
   */
  animations() {
    setInterval(() => {
      if (this.health > 0) {
        this.playAnimation(this.IMAGES_WALKING);
      } else {
        this.playOneImg(this.IMAGES_DEAD);
      }
    }, 100);
  }
  /**
   * Handles the walking animation and movement of the chicken.
   * This function is repeatedly called to update the chicken's position.
   */
  walkAnimation() {
    if (this.health > 0) {
      setInterval(() => {
        this.moveLeft();
      }, 1000 / 60);
    }
  }
}
