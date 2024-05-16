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
}
