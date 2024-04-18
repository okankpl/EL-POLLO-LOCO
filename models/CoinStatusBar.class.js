class CoinStatusbar extends DrawableObject {
    IMAGES = [
      "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
      "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
      "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
      "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
      "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
      "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
    ];
  
    percentage = 0;
    
    constructor() {
      super();
      this.loadImages(this.IMAGES);
      this.setPercentage(0);
      this.x = 40;
      this.y = 110;
      this.width = 200;
      this.height = 60;
    }
  
    setPercentage(percentage) {
      this.percentage = percentage;
      let imagePath = this.IMAGES[this.resolveImageIndex()];
      this.img = this.imageCache[imagePath];
    }
  
    resolveImageIndex() {
      if (this.percentage == 100) {
        return 0;
      } else if (this.percentage > 80) {
        return 1;
      } else if (this.percentage > 60) {
        return 2;
      } else if (this.percentage > 40) {
        return 3;
      } else if (this.percentage > 20) {
        return 4;
      } else {
        return 5;
      }
    }
  }
  