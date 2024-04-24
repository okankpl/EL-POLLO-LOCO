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
    'img/4_enemie_boss_chicken/5_dead/G24.png',
    'img/4_enemie_boss_chicken/5_dead/G25.png',
    'img/4_enemie_boss_chicken/5_dead/G26.png',
  ]

  constructor() {
    super().loadImage("img/4_enemie_boss_chicken/2_alert/G5.png");
    this.loadImages(this.IMAGES_ALERT);
    this.x = 2100;
    this.animate();
    
    this.endbossIsDead = false;
    
  }

  animate() {
    if (!this.endbossIsDead) {
      const alertInterval = setInterval(() => {
        this.playAnimation(this.IMAGES_ALERT);
      }, 200);
    }
      
    
   }
      
    
  

  die() {
   this.endbossIsDead = true;
}
}
