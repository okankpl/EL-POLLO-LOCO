class World {
  character = new Character();
  chicken = new Chicken();
  level = level1;
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
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.clouds);
    this.ctx.translate(-this.camera_x, 0);

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
      this.flipImage(mo);
    }

    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);

    if (mo.otherDirection) {
      mo.x = mo.x * -1;
      this.ctx.restore();
    }
  }

  setWorld() {
    this.character.world = this;
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }
}
