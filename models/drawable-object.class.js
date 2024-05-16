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
  percentage = 100;

  /**
   * Adds audio files to the object's sound array.
   * @param {Array<Audio>} sound - An array of audio elements to be added to the object.
   */
  addAudioToArray(sound) {
    this.sounds.push(...sound);
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
    if (this.img.complete) { // Ensure the image is fully loaded before drawing
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
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

  /**
   * Sets the current percentage of the status bar based on the number of coins collected or used.
   * This function updates the visual representation of the status bar to reflect the current state.
   * @param {number} percentage - The current percentage (0-5) representing the number of coins.
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let imagePath = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[imagePath];
  }

  /**
   * Determines the appropriate image index based on the current percentage of the status bar.
   * This method maps a numerical percentage to an index in the IMAGES array that corresponds to a specific
   * visual representation of the bottle count. The percentage directly translates to the visual fullness
   * of the bottle status bar, where a higher percentage indicates more bottles and thus a fuller image.
   * @returns {number} The index of the image in the IMAGES array that reflects the current state of the bottle status bar.
   */
  resolveImageIndex() {
    if (this instanceof BottleStatusbar || this instanceof CoinStatusbar) {
      return this.collectablesStatusbar();
    } else if (this instanceof Statusbar) {
      return this.characterStatusbar();
    } else if (this instanceof EndbossStatusBar) {
      return this.endbossStatusbar();
    } else {
      return this.endbossStatusbar();
    }
  }

  /**
   * Resolves the image index for collectable status bars based on the percentage.
   * @returns {number} The index for the collectable status bar image.
   */
  collectablesStatusbar() {
    if (this.percentage === 5) {
      return 0;
    } else if (this.percentage === 4) {
      return 1;
    } else if (this.percentage === 3) {
      return 2;
    } else if (this.percentage === 2) {
      return 3;
    } else if (this.percentage === 1) {
      return 4;
    } else {
      return 5;
    }
  }

  /**
   * Resolves the image index for the endboss status bar based on the percentage.
   * @returns {number} The index for the endboss status bar image.
   */
  endbossStatusbar() {
    if (this.percentage === 5) {
      return 0;
    } else if (this.percentage === 4) {
      return 1;
    } else if (this.percentage === 3) {
      return 2;
    } else if (this.percentage === 2) {
      return 3;
    } else if (this.percentage === 1) {
      return 4;
    } else {
      return 5;
    }
  }

  /**
   * Resolves the image index for the character status bar based on the percentage.
   * @returns {number} The index for the character status bar image.
   */
  characterStatusbar() {
    if (this.percentage === 100) {
      return 0;
    } else if (this.percentage > 80) {
      return 1;
    } else if (this.percentage > 60) {
      return 2;
    } else if (this.percentage > 40) {
      return 3;
    } else if (this.percentage > 20) {
      return 4;
    } else {
      return 5;
    }
  }

  /**
   * Resolves the image index for default status bars based on the percentage.
   * @returns {number} The index for the default status bar image.
   */
  endbossStatusbar() {
    if (this.percentage === 5) {
      return 0;
    } else if (this.percentage === 4) {
      return 1;
    } else if (this.percentage === 3) {
      return 2;
    } else if (this.percentage === 2) {
      return 3;
    } else if (this.percentage === 1) {
      return 4;
    } else {
      return 5;
    }
  }
}
