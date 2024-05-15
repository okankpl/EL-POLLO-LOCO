/**
 * Represents a small chicken enemy in the game.
 * This class manages the chick's animations, movements, and interactions with the player,
 * such as walking and dying. The chick is one of the minor enemies in the game.
 *
 * @extends MovableObject  Inherits methods and properties from the MovableObject class,
 *                         which includes movement capabilities and image handling.
 */
class Chick extends MovableObject {
  y = 375;
  height = 45;
  width = 50;
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];
  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_small/2_dead/dead.png"];
  sound = [(this.chicken_dead = new Audio("audio/chicken-dead.mp3"))];
  /**
   * Constructs a new chick object.
   * The chick is placed at a random horizontal position within a specified range to ensure variability in gameplay.
   */
  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
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
   * Initiates and manages the animation loop for the chick object.
   * Handles walking and death animations based on the chick's health.
   */
  animate() {
    if (this.health > 0) {
      setInterval(() => {
        this.moveLeft();
      }, 1000 / 60);

      setInterval(() => {
        if (this.health > 0) {
          this.playAnimation(this.IMAGES_WALKING);
        } else {
          this.playOneImg(this.IMAGES_DEAD);
        }
      }, 100);
    }
  }
}
