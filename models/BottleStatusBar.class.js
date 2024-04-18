class BottleStatusbar extends DrawableObject {
    IMAGES_BOTTLES = [
      "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png",
      "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
      "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
      "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",
      "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",
      "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png",
    ];
  
    percentage = 0;
    
    constructor() {
      super();
      this.loadImages(this.IMAGES_BOTTLES);
      this.setPercentageInverse(0);
      this.x = 40;
      this.y = 60;
      this.width = 200;
      this.height = 60;
    }
  }
  