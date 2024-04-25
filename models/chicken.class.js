class Chicken extends MovableObject {
  y = 370;
  height = 50;
  width = 80;
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];
  isDead = false;
  currentImage = 0;
  chicken_dead = new Audio("audio/chicken-dead.mp3");
  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.x = 600 + Math.random() * 1400;
    this.speed = 0.15 + Math.random() * 0.35;
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.animate();
    this.offset = {
      top: 5,
      left: 5,
      right: 5,
      bottom: 0,
    };
  }

  animate() {
    if (!this.isDead) {
      const chickenIntervall = setInterval(() => {
        this.moveLeft();
      }, 1000 / 60);

      setInterval(() => {
        if (!this.isDead) {
          this.playAnimation(this.IMAGES_WALKING);
        } else {
          this.chicken_dead.play();
          this.playOneImg(this.IMAGES_DEAD);
        }
      }, 200);
    }
  }
}
