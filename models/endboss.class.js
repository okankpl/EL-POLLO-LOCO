class Endboss extends MovableObject {
  IMAGES_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  constructor() {
    super().loadImage("img/4_enemie_boss_chicken/2_alert/G5.png");
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_WALKING);
    this.x = 2100;
    this.animate();
    this.health = 5;
    this.endbossIsDead = false;
      this.offset = {
        top: 50,
        left: 25,
        right: 25,
        bottom: 25,
      };
  }

  animate() {
    setInterval(() => {
      if (this.health <= 0) {
        this.playAnimation(this.IMAGES_DEAD);
      }
      if (this.x == 2100) {
        this.playAnimation(this.IMAGES_ALERT);
      }
      if (this.x < 2100 && this.health > 0) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 200);
  }

  moveEndboss() {
    setTimeout(() => {
      setInterval(() => {
        if (this.health > 0) {
          this.moveLeft();
        }
      }, 2000 / 60);
    }, 3000);
  }
}
