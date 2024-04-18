class World {
  character = new Character();
  chicken = new Chicken();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = new Statusbar();
  bottleStatusBar = new BottleStatusbar();
  coinsStatusBar = new CoinStatusbar();
  throwableObject = [];
  collectedBottles = 0;

  constructor(canvas, keyboard) {
    this.keyboard = keyboard;
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.draw();
    this.setWorld(keyboard);
    this.run();
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
    }, 200);
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy,coins,bottles) => {
      if (this.character.isColliding(enemy,coins,bottles)) {
        this.character.hit();
        this.statusBar.setPercentage(this.character.health);
      }
    });
  }

  collectBottles() {
    this.level.bottles.forEach((bottle) => {
        if (this.character.isColliding(bottle)) {
            if (this.collectedBottles < 5) {
                this.level.bottles.splice(this.level.bottles.indexOf(bottle), 1);
                this.collectedBottles++;
                
                this.statusBarFlasks.setPercentage(this.collectedBottles);
            }
        }
    });
}

  checkThrowObjects() {
    if (this.keyboard.D) {
      let bottle = new ThrowableObject(this.character.x + 50, this.character.y + 100);
      this.throwableObject.push(bottle);
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clears the canvas

    this.ctx.translate(this.camera_x, 0);
    
    this.addObjectsToMap(this.level.backgroundObjects);
    
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObject);
    this.addObjectsToMap(this.level.bottles);
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBar);
    this.addToMap(this.bottleStatusBar);
    this.addToMap(this.coinsStatusBar);
    
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
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  
}
