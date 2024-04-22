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

  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.x = 600 + Math.random() * 1400;
    this.speed = 0.15 + Math.random() * 0.35;
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.animate();
  }

  animate() {
    if (!this.isDead) {
      setInterval(() => {
        this.moveLeft();
      }, 1000 / 60);

      setInterval(() => {
        this.playAnimation(this.IMAGES_WALKING);
      }, 200);
    }
  }

  die() {
    this.isDead = true; // Markiert das Huhn als tot
    this.playOneImg(this.IMAGES_DEAD); // Spielt die Todesanimation ab
    setTimeout(() => {
      this.toRemove = true; // Markiert das Huhn zur Entfernung nach einer Verzögerung
    }, 200); 
}
}
