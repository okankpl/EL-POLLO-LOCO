let canvas;
let world;
let keyboard;
let sounds = [(background_music = new Audio("audio/background-music.mp3"))];
let globalMute = false;
let gameOver = false;

function init() {
  initLevel();
  canvas = document.getElementById("canvas");
  keyboard = new Keyboard();
  world = new World(canvas, keyboard);
  startScreen.style.display = "none";
  mute.style.display = "flex";
  sounds[0].play();
}

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

function revealRestartButton() {
  restart.style.display = "flex";
  mute.style.display = "none";
}

function openInstructions() {
  overlayBlur.classList.toggle("overlay-blur");
  instructions.classList.toggle("d-none");
}

function restartGame() {
  gameOver = false;
  world = null;
  init();
  restart.style.display = "none";
}

document.getElementById("muteButton").addEventListener("click", toggleMute);

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

function mobileControls() {
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
