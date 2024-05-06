class World {
  character = new Character();
  chicken = new Chicken();
  endboss = new Endboss();
  chick = new Chick();
  throwableObject = new ThrowableObject();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = new Statusbar();
  endbossStatusbar = new EndbossStatusBar();
  coinsStatusBar = new CoinStatusbar();
  bottleStatusBar = new BottleStatusbar();
  collectedBottles = 0;
  collectedCoins = 0;
  throwableObjects = [];
  gotKilledByJump = false;
  gameOver_sound = new Audio("audio/game-over.mp3");
  win_sound = new Audio("audio/win.mp3");
  endbossHealth = 5;
  allInttervall = [];
  loseImg = new Overlay(
    "img/9_intro_outro_screens/game_over/oh no you lost!.png",
    0,
    0
  );
  winImg = new Overlay("img/9_intro_outro_screens/game_over/game over!.png");

  constructor(canvas, keyboard) {
    this.keyboard = keyboard;
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.draw();
    this.setWorld(keyboard);
    this.run();
    this.showEndbossStatus = false;
    sounds.push(this.gameOver_sound);
    sounds.push(this.win_sound);
  }

  setWorld() {
    this.character.world = this;
    this.character.animate();
  }

  stopGame() {
    if (gameOver) {
      setTimeout(() => {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
        revealRestartButton();
      }, 400);
    }
  }

  gameOver() {
    if (this.character.health <= 0) {
      gameOver = true;
      this.gameOver_sound.play();
      this.stopGame();
      sounds[0].pause();
    }

    if (world.endboss.health <= 0) {
      gameOver = true;
      sounds[0].pause();
      this.win_sound.play();
      this.stopGame();
    }
  }

  run() {
    setInterval(() => {
      this.checkCollisions();
      this.collectingBottles();
      this.collectingCoins();
      this.gameOver();
      this.bottleHitEndboss();
      this.encounterWithEndboss();
      this.checkThrowObjects();
      this.characterCollideWithEndboss();
    }, 200);

    setInterval(() => {
      this.bottleKill();
      this.jumpKill();
      this.endboss.attackRange(this.endboss.x, this.character.x);
    }, 50);
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && !this.gotKilledByJump) {
        this.decreaseCharacterHealth();
      }
    });
    this.gotKilledByJump = false;
  }

  decreaseCharacterHealth() {
    this.character.hit(5);
    this.statusBar.setPercentage(this.character.health);
  }

  characterCollideWithEndboss() {
    if (this.character.isColliding(this.endboss)) {
      this.character.hit(100);
    }
  }

  encounterWithEndboss() {
    if (this.character.x >= 1500) {
      this.showEndbossStatus = true;
      this.endboss.moveEndboss();
    }
  }

  bottleHitEndboss() {
    this.throwableObjects.forEach((bottle, indexBottle) => {
      if (this.bottleCollidingEnemy(this.endboss, indexBottle) && !bottle.hit) {
        this.decreaseEndbossHealth(bottle);
        bottle.splashAnimation();
        bottle.splash_sound.play();
        this.endboss.gotHitByBottle();
      }
    });
    if (this.endboss.health <= 0) {
      this.endboss.isDead();
      // this.chicken.chicken_dead.play();
    }
  }

  decreaseEndbossHealth(bottle) {
    this.endboss.hit(1);
    this.endbossStatusbar.setPercentage(this.endboss.health);
    bottle.hit = true;
  }

  bottleKill() {
    this.throwableObjects.forEach((bottle, indexBottle) => {
      this.level.enemies.forEach((enemy, index) => {
        if (this.bottleCollidingEnemy(enemy, indexBottle)) {
          this.playSoundsChickenBottle();
          enemy.hit(1);
          setTimeout(() => {
            const i = this.level.enemies.indexOf(enemy);
            if (i > -1) {
              this.removeObjectFromWorld(i);
            }
          }, 150);
        }
      });
    });
  }

  playSoundsChickenBottle() {
    this.throwableObject.splash_sound.play();
    this.chicken.chicken_dead.play();
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

  jumpKill() {
    for (let i = this.level.enemies.length - 1; i >= 0; i--) {
      let enemy = this.level.enemies[i];
      if (this.characterIsAboveEnemy(enemy)) {
        this.setJumpkillTrue(enemy);
        enemy.chicken_dead.play();
        this.jumpAfterKill(enemy);
        setTimeout(() => {
          this.removeObjectFromWorld(i);
        }, 150);
      }
    }
  }

  setJumpkillTrue(enemy) {
    this.gotKilledByJump = true;
    enemy.hit(1);
  }

  characterIsAboveEnemy(enemy) {
    return (
      this.character.isColliding(enemy) &&
      this.character.isAboveGround() &&
      this.character.speedY < 0 &&
      (enemy instanceof Chicken || enemy instanceof Chick)
    );
  }

  jumpAfterKill(enemy) {
    if (this.character.y > 60 && enemy instanceof Chicken) {
      this.character.speedY = 10;
    } else if (this.character.y == 147.5 && enemy instanceof Chick) {
      this.character.speedY = 10;
    }
  }

  removeObjectFromWorld(i) {
    return this.level.enemies.splice(i, 1);
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
        this.character.otherDirection,
        this
      );
      this.throwableObjects.push(bottle);
      this.collectedBottles--;
      this.bottleStatusBar.setPercentage(this.collectedBottles);
    }
  }

  removeThrowableObject(throwableObject) {
    const index = this.throwableObjects.indexOf(throwableObject);
    if (index > -1) {
      this.throwableObjects.splice(index, 1);
    }
  }

  showEndbossStatusbar() {
    if (this.showEndbossStatus) {
      this.addToMap(this.endbossStatusbar);
    }
  }

  showWinLoseOverlay() {
    if (this.character.health <= 0) {
      this.addToMap(this.loseImg);
    } else if (this.endboss.health <= 0) {
      this.addToMap(this.winImg);
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clears the canvas
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBar);
    this.showEndbossStatusbar();

    this.addToMap(this.bottleStatusBar);
    this.addToMap(this.coinsStatusBar);

    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addToMap(this.character);
    this.addToMap(this.endboss);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);

    this.ctx.translate(-this.camera_x, 0);
    this.showWinLoseOverlay();
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
    // mo.drawFrame(this.ctx);

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
