class ThrowableObject extends MovableObject {
  constructor(x, y) {
    super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
    this.height = 70;
    this.width = 70;
    this.throw(100, 150);
    this.x = x;
    this.y = y;
  }

  throw() {
    this.speedY = 30;
    this.applyGravity();
    setInterval(() => {
      this.x += 10;
    }, 25);
  }
}