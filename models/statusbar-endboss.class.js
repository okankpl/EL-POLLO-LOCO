/**
 * Represents the status bar for displaying the health of the end boss in the game.
 * This class extends `DrawableObject` to utilize its image rendering capabilities for displaying the health status.
 * It manages the visual representation of the end boss's health through a series of images that depict different levels of health.
 *
 * @extends DrawableObject
 */
class EndbossStatusBar extends DrawableObject {
  IMAGES = [
    "img/7_statusbars/2_statusbar_endboss/orange/orange100.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange80.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange60.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange40.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange20.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange0.png",
  ];
  /**
   * Initializes a new end boss status bar with predefined images representing different states of the end boss's health.
   * The images range from full health to no health, enabling a clear visual indicator of the end boss's remaining health.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.setPercentage(5);
    this.x = 475;
    this.y = 20;
    this.width = 200;
    this.height = 60;
  }
  
  /**
   * Resolves the index of the image in the IMAGES array based on the current health percentage.
   * This method helps in fetching the correct image that corresponds to the end boss's current health.
   * @returns {number} The index of the image in the IMAGES array.
   */
  resolveImageIndex() {
    if (this.percentage == 5) {
      return 0;
    } else if (this.percentage == 4) {
      return 1;
    } else if (this.percentage == 3) {
      return 2;
    } else if (this.percentage == 2) {
      return 3;
    } else if (this.percentage == 1) {
      return 4;
    } else if (this.percentage <= 0) {
      return 5;
    }
  }
}
