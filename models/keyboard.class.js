class Keyboard {
  LEFT = false;
  RIGHT = false;
  UP = false;
  DOWN = false;
  SPACE = false;
  D = false;

  constructor() {
    this.mobileControls();
  }

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
