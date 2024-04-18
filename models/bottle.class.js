class Bottles extends MovableObject {
    y = 320;
    height = 100;
    IMAGES = [
      "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
      "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
    ];
    currentImage = 0;
  
    constructor() {
      super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
      this.x = 300 + Math.random() * 1400;
      this.loadImages(this.IMAGES);
      this.animate();
    }
  
    animate() {
      setInterval(() => {
        this.playAnimation(this.IMAGES);
      }, 400);
    }
  }
  