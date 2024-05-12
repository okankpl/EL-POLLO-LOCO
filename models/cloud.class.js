/**
 * Represents a cloud in the game's background.
 * This class manages the cloud's image, position, and movement across the game screen to enhance visual aesthetics.
 * Clouds continuously move left to simulate a dynamic sky environment.
 *
 * @extends MovableObject  Inherits methods and properties from the MovableObject class,
 *                         which includes basic image handling and movement capabilities.
 */
class Cloud extends MovableObject {
  height = 250;
  y = 20;
  /**
   * Constructs a new cloud object.
   * The cloud is randomly placed horizontally within the first 500 pixels of the screen.
   */
  constructor() {
    super().loadImage("img/5_background/layers/4_clouds/1.png");
    this.x = Math.random() * 500;
    this.width = 500;
    this.animate();
  }
  /**
   * Initiates and manages the movement animation for the cloud object.
   * This function is continuously called to update the cloud's position, making it move left.
   */
  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }
}
