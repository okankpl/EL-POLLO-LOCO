/**
 * Manages keyboard and touch input for controlling game characters and actions.
 * This class tracks the state of various keys (LEFT, RIGHT, UP, DOWN, SPACE, D)
 * to provide a responsive input system for both desktop and mobile devices.
 */
class Keyboard {
  LEFT = false;
  RIGHT = false;
  UP = false;
  DOWN = false;
  SPACE = false;
  D = false;
  /**
   * Initializes the keyboard with default states for control keys.
   */
  constructor() {
    this.mobileControls();
  }
  /**
   * Sets up touch event listeners for mobile controls, linking screen touches to keyboard actions.
   * This method helps to simulate keyboard events using touch controls on mobile devices.
   */
  mobileControls() {
    document.getElementById("left").addEventListener("touchstart", (e) => {
      e.preventDefault();
      keyboard.LEFT = true;
    });

    document.getElementById("left").addEventListener("touchend", (e) => {
      e.preventDefault();
      keyboard.LEFT = false;
    });

    document.getElementById("right").addEventListener("touchstart", (e) => {
      e.preventDefault();
      keyboard.RIGHT = true;
    });

    document.getElementById("right").addEventListener("touchend", (e) => {
      e.preventDefault();
      keyboard.RIGHT = false;
    });

    document.getElementById("up").addEventListener("touchstart", (e) => {
      e.preventDefault();
      keyboard.SPACE = true;
    });

    document.getElementById("up").addEventListener("touchend", (e) => {
      e.preventDefault();
      keyboard.SPACE = false;
    });

    document.getElementById("throw").addEventListener("touchstart", (e) => {
      e.preventDefault();
      keyboard.D = true;
    });

    document.getElementById("throw").addEventListener("touchend", (e) => {
      e.preventDefault();
      keyboard.D = false;
    });
  }
}
