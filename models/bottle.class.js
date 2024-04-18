class Bottles extends MovableObject {
    y = 320;
    height = 100;
    IMAGES_BOTTLES = [
      "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
      "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
    ];
    currentImage = 0;
  
    constructor() {
      super().loadImage(this.IMAGES_BOTTLES);
      this.x = 300 + Math.random() * 1400;
      this.loadImages(this.IMAGES_BOTTLES);
      this.animate();
    }
  
    animate() {
      setInterval(() => {
        this.playAnimation(this.IMAGES_BOTTLES);
      }, 400);
    }
  }
  