/**
 * Represents a basic drawable object in the game.
 * This class provides the fundamental methods required for loading and displaying images on the canvas,
 * including support for handling multiple images and drawing them at specified coordinates.
 */
class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  x = 120;
  y = 100;
  height = 350;
  width = 150;
  sounds = [];

  /**
   * Adds audio files to the object's sound array.
   * @param {Array<Audio>} sound - An array of audio elements to be added to the object.
   */
  addAudioToArray(sound) {
    sounds.push(...sound);
  }
  /**
   * Loads an image from a specified path and sets it as the main image of the object.
   * @param {string} path - The path to the image file.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }
  /**
   * Draws the object's current main image to the provided canvas context.
   * @param {CanvasRenderingContext2D} ctx - The rendering context to which the image will be drawn.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
  /**
   * Loads multiple images from an array of paths and stores them in the object's image cache.
   * This allows for quick retrieval and drawing of these images.
   * @param {Array<string>} arr - An array of image file paths to load.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }
}
