let canvas;
let world;
let keyboard;
let sounds = [(background_music = new Audio("audio/background-music.mp3"))];
let globalMute = false;
let gameOver = false;

/**
 * Sets up the game by loading levels and game components.
 * Hides the start screen and shows the mute button.
 * Starts playing the background music.
 */
function init() {
  initLevel();
  canvas = document.getElementById("canvas");
  keyboard = new Keyboard();
  world = new World(canvas, keyboard);
  startScreen.style.display = "none";
  mute.style.display = "flex";
  sounds[0].play();
}

/**
 * Switches the mute state of the game.
 * Changes the mute button icon based on whether the game is muted or not.
 */
function toggleMute() {
  globalMute = !globalMute;
  sounds.forEach((sound) => {
    sound.muted = globalMute;
  });
  if (globalMute) {
    muteButton.src = "img/mute.png";
  } else {
    muteButton.src = "img/volumeon.png";
  }
}

/**
 * Shows the restart game button and hides the mute button.
 */
function revealRestartButton() {
  restart.style.display = "flex";
  mute.style.display = "none";
}

/**
 * Toggles the instructions display on and off.
 * This adds or removes a blur effect over the game.
 */
function openInstructions() {
  overlayBlur.classList.toggle("overlay-blur");
  instructions.classList.toggle("d-none");
}

/**
 * Restarts the game by resetting game states and re-initializing the game setup.
 */
function restartGame() {
  toggleMute();
  gameOver = false;
  world = null;
  init();
  restart.style.display = "none";
  toggleMute();
}

/**
 * Event listener for mute button clicks.
 * Calls the toggleMute function when the mute button is clicked.
 */
document.getElementById("muteButton").addEventListener("click", toggleMute);

/**
 * Event listener for key down events to track player's keyboard input.
 * Updates the keyboard state based on which keys are pressed.
 */
window.addEventListener("keydown", (e) => {
  if (e.keyCode == 37) {
    keyboard.LEFT = true;
  }
  if (e.keyCode == 39) {
    keyboard.RIGHT = true;
  }
  if (e.keyCode == 38) {
    keyboard.UP = true;
  }
  if (e.keyCode == 40) {
    keyboard.DOWN = true;
  }
  if (e.keyCode == 32) {
    keyboard.SPACE = true;
  }
  if (e.keyCode == 68) {
    keyboard.D = true;
  }
});

/**
 * Event listener for key up events to track player's keyboard input.
 * Updates the keyboard state based on which keys are released.
 */
window.addEventListener("keyup", (e) => {
  if (e.keyCode == 37) {
    keyboard.LEFT = false;
  }
  if (e.keyCode == 39) {
    keyboard.RIGHT = false;
  }
  if (e.keyCode == 38) {
    keyboard.UP = false;
  }
  if (e.keyCode == 40) {
    keyboard.DOWN = false;
  }
  if (e.keyCode == 32) {
    keyboard.SPACE = false;
  }
  if (e.keyCode == 68) {
    keyboard.D = false;
  }
});
