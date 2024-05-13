/**
 * Represents the health status bar in the game, showing the current health of a character or entity.
 * This class extends `DrawableObject` to utilize its image rendering capabilities for displaying the health status.
 * The status bar changes visually based on the current health percentage, providing a clear visual indicator of health levels.
 *
 * @extends DrawableObject
 */
class Statusbar extends DrawableObject {
  IMAGES = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
  ];

  percentage = 100;
  /**
   * Initializes a new health status bar with predefined images representing different states of health from full to empty.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.setPercentage(100);
    this.x = 40;
    this.y = 20;
    this.width = 200;
    this.height = 60;
  }

  /**
   * Resolves the index of the image in the IMAGES array based on the current health percentage.
   * This method helps in fetching the correct image that corresponds to the character's current health.
   * The health percentage translates to an image index that visually represents health from full to empty.
   * @returns {number} The index of the image in the IMAGES array.
   */
  resolveImageIndex() {
    if (this.percentage == 100) {
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
}
