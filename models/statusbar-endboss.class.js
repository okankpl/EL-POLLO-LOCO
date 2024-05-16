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
  
}
