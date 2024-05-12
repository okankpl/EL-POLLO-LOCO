/**
 * Represents a background object in the game.
 * This class is used to create visual elements in the game's background,
 * such as scenery layers that move at different speeds to create a parallax effect.
 * Each background object has a predefined width and height, and it is placed at a specific
 * horizontal position (`x`) in the game world, starting from the top of the canvas (`y` = 0).
 *
 * @extends MovableObject  Inherits methods and properties from the MovableObject class.
 */
class BackgroundObject extends MovableObject {
  /**
   * Creates a background object.
   * 
   * @param {string} imagePath - The path to the image file used for the background object.
   * @param {number} x - The initial horizontal position of the background object on the canvas.
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.y = 0; // Background objects start at the top of the canvas.
    this.x = x; // Set the horizontal position.
    this.width = 720; // Fixed width for all background objects.
    this.height = 480; // Fixed height for all background objects.
  }
}