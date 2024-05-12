/**
 * Represents the status bar for bottles in the game, showing the current count or state of bottles available to the player.
 * This class extends `DrawableObject` to utilize its image rendering capabilities for displaying the bottle status.
 *
 * @extends DrawableObject
 */
class BottleStatusbar extends DrawableObject {
  IMAGES = [
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png",
  ];
  /**
   * Initializes a new bottle status bar with predefined images representing different states of bottle availability.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.setPercentage(0);
    this.x = 40;
    this.y = 70;
    this.width = 200;
    this.height = 60;
  }
  /**
   * Sets the current percentage of the status bar based on the number of bottles collected or used.
   * This function updates the visual representation of the status bar to reflect the current state.
   * @param {number} percentage - The current percentage (0-5) representing the number of bottles.
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
 * 
 * The mapping is as follows:
 * - 5 corresponds to the image for 100% full,
 * - 4 corresponds to 80%,
 * - 3 to 60%,
 * - 2 to 40%,
 * - 1 to 20%,
 * - 0 to an empty status bar.
 *
 * @returns {number} The index of the image in the IMAGES array that reflects the current state of the bottle status bar.
 */
  resolveImageIndex() {
    // Return the corresponding image index based on the percentage value.
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
