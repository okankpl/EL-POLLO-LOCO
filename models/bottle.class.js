class Bottles extends MovableObject {
    y = 360;
    height = 70;
    width = 70;
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
      this.offset = {
        top: 10,
        left: 15,
        right: 15,
        bottom: 10
      };
    }
  
    animate() {
      setInterval(() => {
        this.playAnimation(this.IMAGES);
      }, 400);
    }
  }
  