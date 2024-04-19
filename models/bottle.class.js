class Bottles extends MovableObject {
    y = 340;
    height = 90;
    width = 90;
    IMAGES = [
      "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
      "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
    ];
    currentImage = 0;
  
    constructor() {
      super().loadImage("img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
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
  