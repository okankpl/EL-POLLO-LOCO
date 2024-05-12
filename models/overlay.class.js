/**
 * Represents an win or lose overlay in the game.
 * This class extends `DrawableObject` to utilize its image handling capabilities for rendering overlays.
 *
 * @extends DrawableObject
 */
class Overlay extends DrawableObject {
  width = 720;
  height = 480;

  /**
   * Initializes a new overlay object with a specific image.
   * This constructor sets the overlay to cover the entire game canvas, typically for end-game scenarios.
   *
   * @param {string} path - The path to the image file that will be displayed as an overlay.
   */
  constructor(path) {
    super().loadImage(path);
    this.x = 0;
    this.y = 0;
  }
}
