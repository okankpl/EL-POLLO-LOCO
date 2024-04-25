class World {
  character = new Character();
  chicken = new Chicken();
  endboss = new Endboss(this);
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
  background_music = new Audio("audio/background-music.mp3");
  gameOver_sound = new Audio("audio/game-over.mp3");
  gameOverPlayed = false;
  endbossHealth = 5;

  constructor(canvas, keyboard) {
    this.keyboard = keyboard;
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.draw();
    this.setWorld(keyboard);
    this.run();

    this.gameSounds = [
      this.character.walking_sound,
      this.character.jumping_sound,
      this.character.snoring_sound,
      this.character.hurt_sound,
      this.gameOver_sound,
      this.background_music,
      this.chicken.chicken_dead,
    ];
    this.muted = false;
    this.showEndbossStatus = false;
  }

  toggleMute() {
    this.muted = !this.muted;
    this.gameSounds.forEach((sound) => {
      if (sound) {
        sound.muted = this.muted;
      }
    });
  }

  setWorld() {
    this.character.world = this;
    this.character.animate();
  }

  playGameOverSound() {
    if (this.character.health <= 0 && !this.gameOverPlayed) {
      this.background_music.pause();
      this.gameOver_sound.play();
      // clearInterval(this.gameInterval); // Stoppt das Spielintervall
      // clearInterval(this.throwInterval);
      // clearInterval(this.killInterval);
      this.gameOverPlayed = true;
    } else if (!this.gameOverPlayed) {
      this.background_music.loop = true;
      this.background_music.play();
    }
  }

  run() {
    this.gameInterval = setInterval(() => {
      this.checkCollisions();
      this.collectingBottles();
      this.collectingCoins();
      this.playGameOverSound();
      this.bottleHitEndboss();
      this.encounterWithEndboss();
    }, 300);

    this.throwInterval = setInterval(() => {
      this.checkThrowObjects();
    }, 300);

    this.killInterval = setInterval(() => {
      this.bottleKill();
      this.jumpKill();
    }, 50);
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && !this.gotKilledByJump) {
        this.character.hit(5);
        this.statusBar.setPercentage(this.character.health);
      }
    });
    this.gotKilledByJump = false;
  }

  bottleKill() {
    this.throwableObjects.forEach((bottle, indexBottle) => {
      this.level.enemies = this.level.enemies.filter((enemy, index) => {
        if (this.bottleCollidingEnemy(enemy, indexBottle) && enemy instanceof Chicken) {
          setTimeout(() => {
            enemy.die();
          }, 300);
          return false;
        }
        return true;
      });
    });
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
      }
    });
    if (this.endboss.health <= 0) {
      this.endboss.isDead();
    }
  }

  decreaseEndbossHealth(bottle) {
    this.endboss.hit(1);
    this.endbossStatusbar.setPercentage(this.endboss.health);
    bottle.hit = true;
  }

  jumpKill() {
    for (let i = this.level.enemies.length - 1; i >= 0; i--) {
      let enemy = this.level.enemies[i];
      if (this.characterIsAboveEnemy(enemy)) {
        if (enemy instanceof Chicken && !enemy.isDead) {
          this.setJumpkillTrue(enemy);
          setTimeout(() => {
            this.level.enemies.splice(i, 1);
          }, 300);
        }
      }
    }
  }

  setJumpkillTrue(enemy) {
    enemy.isDead = true;
    this.gotKilledByJump = true;
    this.jumpAfterKill();
  }

  characterIsAboveEnemy(enemy) {
    return (
      this.character.isColliding(enemy) &&
      this.character.isAboveGround() &&
      this.character.speedY < 0 &&
      enemy instanceof Chicken &&
      !enemy.isDead
    );
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

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clears the canvas
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBar);
    if (this.showEndbossStatus) {
      this.addToMap(this.endbossStatusbar);
    }

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
