class World {
  character = new Character();
  chicken = new Chicken();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = new Statusbar();
  coinsStatusBar = new CoinStatusbar();
  bottleStatusBar = new BottleStatusbar();
  throwableObject = [];
  collectedBottles = 0;
  collectedCoins = 0;

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
      this.collectingBottles();
      this.collectingCoins();
      this.checkCollisionsWithBottles();
    }, 200);
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hit();
        this.statusBar.setPercentage(this.character.health);
      }
    });
  }

  checkCollisionsWithBottles() {
    this.throwableObject = this.throwableObject.filter(bottle => {
      if (!bottle.checkCollisionWithEnemy(this.level.enemies)) {
        return true; // Behält die Flasche bei, wenn sie keinen Gegner getroffen hat
      } else {
        // Optional: Füge hier Logik hinzu, um Animationen oder Soundeffekte abzuspielen
        return false; // Entfernt die Flasche, wenn sie einen Gegner getroffen hat
      }
    });
  }

  
  collectingBottles() {
    this.level.bottles.forEach((bottle, index) => {
      if (this.character.isColliding(bottle)) {
        if (this.collectedBottles < 5) {
          this.level.bottles.splice(index, 1);
          this.collectedBottles++;
          this.bottleStatusBar.setPercentage(this.collectedBottles);
        }
      }
    });
  }

  collectingCoins() {
    this.level.coins.forEach((coins, index) => {
      if (this.character.isColliding(coins)) {
        if (this.collectedCoins < 5) {
          this.level.coins.splice(index, 1);
          this.collectedCoins++;
          this.coinsStatusBar.setPercentage(this.collectedCoins);
        }
      }
    });
  }

  checkThrowObjects() {
    if (this.keyboard.D && this.collectedBottles > 0) {
      let bottle = new ThrowableObject(this.character.x + 50, this.character.y + 100);
      this.throwableObject.push(bottle);
      this.collectedBottles--;  
      this.bottleStatusBar.setPercentage(this.collectedBottles);  
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clears the canvas
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBar);
    this.addToMap(this.bottleStatusBar);
    this.addToMap(this.coinsStatusBar);

    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObject);
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
