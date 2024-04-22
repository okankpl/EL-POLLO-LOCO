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
  collectedBottles = 0;
  collectedCoins = 0;
  throwableObjects = [];
  

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
      this.updateGameObjects();
    }, 200);

    setInterval(() => {
      this.bottleKill();
      this.jumpKill();
    }, 50);
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hit();
        this.statusBar.setPercentage(this.character.health);
      }
    });
  }

  updateGameObjects() {
    this.throwableObjects = this.throwableObjects.filter(
      (obj) => !obj.toRemove
    ); // Entfernt alle Objekte, die zur Entfernung markiert sind
  }

  bottleKill() {
    this.throwableObjects.forEach((bottle, indexBottle) => {
      this.level.enemies.forEach((enemy, indexEnemy) => {
        if (this.bottleCollidingEnemy(enemy, indexBottle)) {
          enemy.die(); // Ruft die Sterbemethode auf
        }
      });
    });

    // Filtern Sie die Feinde heraus, die entfernt werden sollen
    this.level.enemies = this.level.enemies.filter((enemy) => !enemy.toRemove);
  }

  jumpKill() {
    this.level.enemies = this.level.enemies.filter((enemy) => {
      if (
        this.character.isColliding(enemy) &&
        this.character.isAboveGround() &&
        this.character.speedY < 0
      ) {
        enemy.die(); // Ruft die Sterbemethode auf
        this.jumpAfterKill(); // Zusätzlicher Sprung nach dem Töten
      }
      return !enemy.toRemove; // Behalten des Gegners in der Liste, wenn er nicht zur Entfernung markiert ist
    });
  }

  jumpAfterKill() {
    if (this.character.y > 60) {
      this.character.speedY = 10;
    }
  }

  bottleCollidingEnemy(enemy, indexBottle) {
    let bottle = this.throwableObjects[indexBottle];
    return (
      bottle.x < enemy.x + enemy.width &&
      bottle.x + bottle.width > enemy.x &&
      bottle.y < enemy.y + enemy.height &&
      bottle.y + bottle.height > enemy.y
    );
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
      let bottle = new ThrowableObject(
        this.character.x + 50,
        this.character.y + 100,
        this.character.otherDirection
      );
      this.throwableObjects.push(bottle);
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
    this.addObjectsToMap(this.throwableObjects);
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
    if (!mo.isVisible && this instanceof ThrowableObject) return;

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
