class Overlay extends DrawableObject {
  width = 720;
  height = 480;

  LOSE = ["img/9_intro_outro_screens/game_over/game over.png"];

  constructor(path) {
    super().loadImage(path);
    this.x = 0;
    this.y = 0;
  }
}
