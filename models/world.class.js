class World {
  character = new Character();
  enemies = [new Chicken(), new Chicken(), new Chicken()];

  clouds = [new Cloud()];
  backgroundObject = [
    new BackgroundObject("img/5_background/layers/air.png", -719),
    new BackgroundObject("img/5_background/layers/3_third_layer/2.png", -719),
    new BackgroundObject("img/5_background/layers/2_second_layer/2.png", -719),
    new BackgroundObject("img/5_background/layers/1_first_layer/2.png", -719, 480),

    new BackgroundObject("img/5_background/layers/air.png", 0),
    new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 0),
    new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 0),
    new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 0, 480),

    new BackgroundObject("img/5_background/layers/air.png", 719),
    new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719),
    new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719),
    new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719, 480),

    new BackgroundObject("img/5_background/layers/air.png", 2*719),
    new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 2*719),
    new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 2*719),
    new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 2*719, 480),
  ];

  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  constructor(canvas, keyboard) {
    this.keyboard = keyboard;
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.draw();
    this.setWorld(keyboard);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clears the canvas
    this.ctx.translate(this.camera_x,0);
    this.addObjectsToMap(this.backgroundObject);
    this.addToMap(this.character);
    this.addObjectsToMap(this.enemies);
    this.addObjectsToMap(this.clouds);
    this.ctx.translate(-this.camera_x,0);

    //draw wird immer wieder aufgerufen
    let self = this;
    requestAnimationFrame(function () {
      self.draw(); //innerhalb der Funktion ist this nicht gültig
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.ctx.save();
      this.ctx.translate(mo.width, 0);
      this.ctx.scale(-1, 1);
      mo.x = mo.x * -1;
    }
    this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    if (mo.otherDirection) {
      mo.x = mo.x * -1;
      this.ctx.restore();
    }
  }

  setWorld() {
    this.character.world = this;
  }
}
