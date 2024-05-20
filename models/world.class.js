/**
 * Represents the main game environment, managing all game entities, interactions, and the state of the game.
 * This class holds all elements that make up the game world, including characters, enemies, items, and the game's status bars.
 */
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
  loseImg = new Overlay("img/9_intro_outro_screens/game_over/oh no you lost!.png",720,480,0,0);
  winImg = new Overlay("img/win_2.png", 600, 360, canvas.width / 2 - 300, canvas.height / 2 - 180);
  bgrMusic = sounds[0];
  bottleCooldown = false;
  animatiomFrame;
  /**
   * Constructs the game world and initializes all game components.
   * @param {HTMLCanvasElement} canvas - The canvas on which the game is drawn.
   * @param {Keyboard} keyboard - The keyboard input handler for controlling game interactions.
   */
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

  /**
   * Sets up the world context for all game elements, allowing for interaction and animation within the world.
   */
  setWorld() {
    this.character.world = this;
    this.character.animate();
  }
  /**
   * Stops all game activity, typically called when the game is over.
   */
  stopGame() {
    if (gameOver) {
      setTimeout(() => {
        for (let i = 1; i < 999999; i++) window.clearInterval(i);
        revealRestartButton();
        this.animatiomFrame = null;
      }, 400);
    }
  }

  /**
   * Handles game over conditions, checking if the character or end boss has died, and triggers the end game sequence.
   */
  gameOver() {
    if (this.character.health <= 0) {
      gameOver = true;
      this.gameOver_sound.play();
      this.stopGame();
      this.bgrMusic.pause();
    }

    if (world.endboss.health <= 0) {
      gameOver = true;
      this.bgrMusic.pause();
      this.win_sound.play();
      this.stopGame();
    }
  }
  /**
   * Main game loop that handles all dynamic elements of the game such as movements, collisions, and interactions.
   */
  run() {
    setInterval(() => {
      this.collectingBottles();
      this.collectingCoins();
      this.gameOver();
      this.bottleHitEndboss();
      this.encounterWithEndboss();
      this.checkThrowObjects();
      this.characterCollideWithEndboss();
      this.checkCollisions();
    }, 200);

    setInterval(() => {
      this.bottleKill();
      this.jumpKill();
      this.endboss.attackRange(this.endboss.x, this.character.x);
    }, 50);
  }
  /**
   * Checks if any enemy is colliding with the character.
   * if there is a collision and it's not a jump kill, the character gets damage from the collision
   */
  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && !this.gotKilledByJump && !this.character.isAboveGround()) {
        this.decreaseCharacterHealth();
      }
    });
  }
  /**
   * decreases the health of the character and updates the health status bar
   */
  decreaseCharacterHealth() {
    this.character.hit(5);
    this.statusBar.setPercentage(this.character.health);
  }

  /**
   * checks collision with the endboss and sets a instant kill for the character
   */
  characterCollideWithEndboss() {
    if (this.character.isColliding(this.endboss)) {
      this.character.hit(100);
      this.statusBar.setPercentage(this.character.health);
    }
  }
  /**
   * Manages encounters with the end boss, reveals the endboss health statusbar
   * and starts the movement of the endboss
   */
  encounterWithEndboss() {
    if (this.character.x >= 1500) {
      this.showEndbossStatus = true;
      this.endboss.moveEndboss();
    }
  }

  /**
   * Manages the impact of bottles on the end boss, including dealing damage and playing animations.
   * If a bottle hits the endboss, the health of the endboss gets decreased.
   */
  bottleHitEndboss() {
    this.throwableObjects.forEach((bottle, indexBottle) => {
      if (this.bottleCollidingEnemy(this.endboss, indexBottle) && !bottle.hit) {
        this.decreaseEndbossHealth(bottle);
        bottle.splashAnimation();
        if (!globalMute) {
          bottle.splash_sound.play();
        }
        this.endboss.gotHitByBottle();
      }
    });
    if (this.endboss.health <= 0) {
      this.endboss.isDead();
    }
  }
  /**
   * Decreases the end boss's health as a result of being hit by a bottle.
   * @param {ThrowableObject} bottle - The bottle causing the damage.
   */
  decreaseEndbossHealth(bottle) {
    this.endboss.hit(1);
    this.endbossStatusbar.setPercentage(this.endboss.health);
    bottle.hit = true;
  }
  /**
   * Manages the destruction of enemies through impact by thrown bottles.
   * After the collision, the enemies getting removed from the world.
   */
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
  /**
   * Plays audio effects associated with a chicken being hit by a bottle.
   */
  playSoundsChickenBottle() {
    if (!globalMute) {
      this.throwableObject.splash_sound.play();
      this.chicken.chicken_dead.play();
    }
  }
  /**
   * Determines if a throwable object (bottle) is colliding with an enemy.
   * @param {MovableObject} enemy - The enemy to check for collision.
   * @param {ThrowableObject} bottle - The bottle to check collision with.
   * @returns {boolean} True if collision occurs, false otherwise.
   */
  bottleCollidingEnemy(enemy, indexBottle) {
    let bottle = this.throwableObjects[indexBottle];
    return (
      bottle.x < enemy.x + enemy.width &&
      bottle.x + bottle.width > enemy.x &&
      bottle.y < enemy.y + enemy.height &&
      bottle.y + bottle.height > enemy.y
    );
  }
  /**
   * Handles the defeat of enemies by the character jumping on them.
   *  After the collision, the enemies getting removed from the world.
   */
  jumpKill() {
    for (let i = this.level.enemies.length - 1; i >= 0; i--) {
      let enemy = this.level.enemies[i];
      if (this.characterIsAboveEnemy(enemy)) {
        this.setJumpkillTrue(enemy);
        enemy.chicken_dead.play();
        this.jumpAfterKill(enemy);
        setTimeout(() => {
          this.removeObjectFromWorld(i);
          this.gotKilledByJump = false;
        }, 200);
      }
    }
  }
  /**
   * Sets the flag for a successful jump kill, indicating that the kill was achieved by jumping.
   * @param {MovableObject} enemy - The enemy that was jumped on.
   */
  setJumpkillTrue(enemy) {
    this.gotKilledByJump = true;
    enemy.hit(1);
  }
  /**
   * Validates if the character is directly above an enemy, which enables a jump kill.
   */
  characterIsAboveEnemy(enemy) {
    return (
      this.character.isColliding(enemy) &&
      this.character.isAboveGround() &&
      this.character.speedY < 0 &&
      (enemy instanceof Chicken || enemy instanceof Chick)
    );
  }

  /**
   * Checks if the character is positioned correctly above an enemy to perform a jump kill.
   * @param {MovableObject} enemy - The enemy to check against.
   * @returns {boolean} True if the character is above and descending on the enemy, otherwise false.
   */
  jumpAfterKill(enemy) {
    if (this.character.y > 60 && enemy instanceof Chicken) {
      this.character.speedY = 10;
    } else if (enemy instanceof Chick) {
      this.character.speedY = 10;
    }
  }

  /**
   * Removes an enemy from the game world.
   * @param {number} i - Index of the enemy in the level's enemies array.
   * @returns {MovableObject[]} The updated array of enemies.
   */
  removeObjectFromWorld(i) {
    return this.level.enemies.splice(i, 1);
  }

  /**
   * Manages the collection of bottles within the game world, updating the player's bottle status bar.
   */
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

  /**
   * Manages the collection of coins within the game world, updating the player's coin status bar.
   */
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

  /**
   * Checks if the player has initiated a throw action ('D' key) and if there are bottles available.
   * Creates a new ThrowableObject positioned relative to the character and updates the inventory.
   * The new throwable object is then added to the game world and the count of available bottles is decremented.
   * Updates the visual bottle status bar to reflect the new inventory status.
   * There is also a cooldown for throwing bottles.
   */
  checkThrowObjects() {
    if (this.keyboard.D && this.collectedBottles > 0 && !this.bottleCooldown) {
      let bottle = new ThrowableObject(
        this.character.x + 50,
        this.character.y + 100,
        this.character.otherDirection,
        this
      );
      this.bottleCooldown = true;
      this.throwableObjects.push(bottle);
      this.collectedBottles--;
      this.bottleStatusBar.setPercentage(this.collectedBottles);
      this.character.measureLastCharacterAction();
      setTimeout(() => {
        this.bottleCooldown = false;
      }, 2000);
    }
  }

  /**
   * Removes a throwable object from the list of active throwable objects in the game.
   * This method is typically called after a throwable object has completed its interaction, such as impacting a target or reaching the end of its trajectory.
   * @param {ThrowableObject} throwableObject - The throwable object to be removed from the game world.
   */
  removeThrowableObject(throwableObject) {
    const index = this.throwableObjects.indexOf(throwableObject);
    if (index > -1) {
      this.throwableObjects.splice(index, 1);
    }
  }

  /**
   * Displays the end boss's status bar when appropriate, contributing to the game's strategic elements.
   */
  showEndbossStatusbar() {
    if (this.showEndbossStatus) {
      this.addToMap(this.endbossStatusbar);
    }
  }

  /**
   * Displays the win or lose screen based on the game outcome, adding a specific overlay to the gameplay.
   */
  showWinLoseOverlay() {
    if (this.character.health <= 0) {
      this.addToMap(this.loseImg);
    } else if (this.endboss.health <= 0) {
      this.addToMap(this.winImg);
    }
  }

  /**
   * Renders all game elements on the canvas, applies transformations for camera movement, and ensures continuous game visual updates.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.drawBackgroundObjects();
    this.ctx.translate(-this.camera_x, 0);
    this.drawStatusBar();
    this.ctx.translate(this.camera_x, 0);
    this.drawCollectableObjects();
    this.drawMovablesObjects();
    this.addObjectsToMap(this.throwableObjects);
    this.ctx.translate(-this.camera_x, 0);
    this.showWinLoseOverlay();
    let self = this;
    this.animationFrame = requestAnimationFrame(function () {
      self.draw();
    });
  }


  /**
   * draws background objects to the canvas
   */
  drawBackgroundObjects() {
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
  }

  /**
   * draws the statusbars to the canvas
   */
  drawStatusBar() {
    this.addToMap(this.statusBar);
    this.showEndbossStatusbar();
    this.addToMap(this.bottleStatusBar);
    this.addToMap(this.coinsStatusBar);
  }

  /**
   * draws the movable objects to the canvas
   */
  drawMovablesObjects() {
    this.addToMap(this.character);
    this.addToMap(this.endboss);
    this.addObjectsToMap(this.level.enemies);
  }

  /**
   * draws the movable objects to the canvas
   */
  drawCollectableObjects() {
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
  }

  /**
   * Adds multiple game objects to the rendering map.
   * @param {MovableObject[]} objects - An array of game objects to be added for rendering.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Adds a single game object to the rendering map, applying visual transformations if needed.
   * @param {MovableObject} mo - The game object to add to the rendering map.
   */
  addToMap(mo) {
    if (!mo.isVisible && this instanceof ThrowableObject) return;
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * Applies a horizontal flip to an object's rendering on the canvas, used for objects facing left.
   * @param {MovableObject} mo - The object whose rendering is to be flipped.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Restores the canvas context to its original state after flipping an object's rendering.
   * @param {MovableObject} mo - The object whose rendering was flipped.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
