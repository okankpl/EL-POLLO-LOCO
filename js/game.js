let canvas;
let world;
let keyboard;
let sounds = [(background_music = new Audio("audio/background-music.mp3"))];
let globalMute = false;

function init() {
  initLevel();
  canvas = document.getElementById("canvas");
  keyboard = new Keyboard();
  world = new World(canvas, keyboard);
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
