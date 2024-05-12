/**
 * Represents a collectible bottle object in the game, specifically salsa bottles found on the ground.
 * This class manages the bottle's appearance, animation, and positioning within the game environment.
 * Bottles can be collected by the player to be used later or have specific interactions within the game.
 *
 * @extends MovableObject  Inherits methods and properties from the MovableObject class,
 *                         including movement capabilities and image handling.
 */
class Bottles extends MovableObject {
  y = 360;
  height = 70;
  width = 70;
  IMAGES = [
    "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];
  currentImage = 0;
  /**
   * Constructs a new bottle object.
   * The bottle is randomly placed horizontally within a given range to ensure variability in gameplay.
   */
  constructor() {
    super().loadImage("img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
    this.x = 300 + Math.random() * 1400;
    this.loadImages(this.IMAGES); // Preload all animation images.
    this.animate();
    this.offset = {
      top: 10,
      left: 15,
      right: 15,
      bottom: 10,
    }; // Set hitbox offsets for collision detection.
  }
  /**
   * Initiates and manages the animation loop for the bottle object.
   * Cycles through images to create an animated effect.
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES);
    }, 300);
  }
}
