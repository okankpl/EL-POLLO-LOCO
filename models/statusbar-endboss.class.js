class EndbossStatusBar extends DrawableObject {

    IMAGES = [
        'img/7_statusbars/2_statusbar_endboss/orange/orange100.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(5);
        this.x = 475;
        this.y = 20;
        this.width = 200;
        this.height = 60;
      }
    
      setPercentage(percentage) {
        this.percentage = percentage;
        let imagePath = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[imagePath];
      }
    
      resolveImageIndex() {
        if (this.percentage == 5) {
          return 0;
        } else if (this.percentage == 4) {
          return 1;
        } else if (this.percentage == 3) {
          return 2;
        } else if (this.percentage == 2) {
          return 3;
        } else if (this.percentage == 1) {
          return 4;
        } else if (this.percentage <= 0) {
          return 5;
        }
      }
}