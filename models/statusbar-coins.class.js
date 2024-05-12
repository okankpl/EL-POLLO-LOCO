/**
 * Represents the status bar for coins in the game, showing the current count or state of coins collected by the player.
 * This class extends `DrawableObject` to utilize its image rendering capabilities for displaying the coin status.
 *
 * @extends DrawableObject
 */
class CoinStatusbar extends DrawableObject {
  IMAGES = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
  ];
  /**
   * Initializes a new coin status bar with predefined images representing different states of coin availability.
   */
  constructor() {
    super(); // Call the constructor of DrawableObject.
    this.loadImages(this.IMAGES);
    this.setPercentage(0);
    this.x = 40;
    this.y = 120;
    this.width = 200;
    this.height = 60;
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
   * Resolves the index of the image in the IMAGES array based on the current percentage.
   * This method helps in fetching the correct image that corresponds to the number of coins available or used.
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
    } else if (this.percentage == 0) {
      return 5;
    }
  }
}
