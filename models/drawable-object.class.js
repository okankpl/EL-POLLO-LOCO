class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  x = 120;
  y = 100;
  height = 350;
  width = 150;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof Endboss
    ) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }
  
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.handleInstance();
    this.img = this.imageCache[path];
}


handleInstance() {
if (this instanceof BottleStatusbar) {
    return this.IMAGES_BOTTLES[this.resolveImageIndex()];
}  else {
    return this.IMAGES[this.resolveImageIndex()];
}
}


resolveImageIndex() {
if (this instanceof BottleStatusbar) {
    return this.percentageInvers(); // Call as property
} else if (this instanceof Statusbar) {
    return this.percentageNormal(); // Call as property
}
}


percentageNormal() {
if (this.percentage == 100) {
    return 5;
} else if (this.percentage == 80) {
    return 4;
} else if (this.percentage == 60) {
    return 3;
} else if (this.percentage == 40) {
    return 2;
} else if (this.percentage == 20) {
    return 1;
} else {
    return 0;
}
}


percentageInvers() {
if (this.percentage == 0) {
   return 0;
} else if (this.percentage == 1) {
   return 1;
} else if (this.percentage == 2) {
   return 2;
} else if (this.percentage == 3) {
   return 3;
} else if (this.percentage == 4) {
   return 4;
} else {
   return 5;
}
}
}
