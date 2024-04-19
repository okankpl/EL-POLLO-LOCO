class ThrowableObject extends MovableObject {
  constructor(x, y, collectedBottles) {
    super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
    this.height = 70;
    this.width = 70;
    this.throw(100, 150, collectedBottles);
    this.x = x;
    this.y = y;
  }

  setCollectedBottles(collectedBottles) {
    this.collectedBottles = collectedBottles;
  }

  throw(collectedBottles) {
    if (collectedBottles > 0) {
      collectedBottles--;

      this.speedY = 30;
      this.applyGravity();
      setInterval(() => {
        this.x += 10;
      }, 25);
    }
  }
  }

