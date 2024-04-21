class Coins extends MovableObject {
    y = 320;
    height = 120;
    IMAGES = [
      "img/8_coin/coin_1.png",
      "img/8_coin/coin_2.png",
    ];
    currentImage = 0;
  
    constructor() {
      super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
      this.x = 300 + Math.random() * 2000;
      this.loadImages(this.IMAGES);
      this.animate();
      this.offset = {
        top: 35,
        left: 45,
        right: 45,
        bottom: 35
      };
    }
  
    animate() {
      setInterval(() => {
        this.playAnimation(this.IMAGES);
      }, 400);
    }
  }
  