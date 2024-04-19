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
      this instanceof Endboss ||
      this instanceof Coins || 
      this instanceof Bottles ||
      this instanceof ThrowableObject
    ) {
      ctx.beginPath();
      
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
}