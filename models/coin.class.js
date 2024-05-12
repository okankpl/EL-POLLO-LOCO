/**
 * Represents a collectible coin object in the game.
 * This class manages the coin's appearance, animation, and positioning within the game environment.
 * Coins can be collected by the player to increase their score or achieve game objectives.
 *
 * @extends MovableObject  Inherits methods and properties from the MovableObject class,
 *                         which includes basic image handling and movement capabilities.
 */
class Coins extends MovableObject {
  y = 320;
  height = 120;
  IMAGES = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];
  currentImage = 0;
  /**
   * Constructs a new coin object.
   * The coin is randomly placed horizontally within a specified range to ensure variability in gameplay.
   * The initial image loaded is incorrect and should be updated to match the coin's appearance.
   */
  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.x = 300 + Math.random() * 2000;
    this.loadImages(this.IMAGES);
    this.animate();
    this.offset = {
      top: 35,
      left: 45,
      right: 45,
      bottom: 35,
    };
  }
  /**
   * Initiates and manages the animation loop for the coin object.
   * Cycles through images to create an animated twinkling effect.
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES);
    }, 300);
  }
}
