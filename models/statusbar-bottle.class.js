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
  
}
