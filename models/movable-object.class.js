/**
 * Represents any object in the game that has mobility and can interact with other game elements.
 * This class extends `DrawableObject` to include movement capabilities, health management,
 * gravity effects, collision detection, and other dynamic behaviors.
 *
 * @extends DrawableObject
 */
class MovableObject extends DrawableObject {
  /**
   * Initializes a new MovableObject with default values.
   */
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  health = 100;
  lastHit = 0;
  isVisible = true;
  attackDistance;
  hitByBottle = false;
  soundEffects = [];
  lastCharacterAction;

  offset = {
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  };

  /**
   * Applies gravity to the object, causing it to fall if above the ground or rise if jumping.
   */
  applyGravity() {
    return setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
      if (this.y >= 377.5) {
        this.y = 377.5;
        this.speedY = 0;
      }
    }, 1000 / 25);
  }
  /**
   * Determines if the object is above the ground.
   * @returns {boolean} True if above ground, otherwise false.
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 171;
    }
  }
  /**
   * Calculates the distance to attack based on the position of the end boss and the character.
   * @param {number} endbossX - X-coordinate of the end boss.
   * @param {number} characterX - X-coordinate of the character.
   * @returns {number} The calculated attack distance.
   */
  attackRange(endbossX, characterX) {
    this.attackDistance = endbossX - characterX;
    return this.attackDistance;
  }
  /**
   * Animates the object by cycling through a set of images.
   * @param {Array<string>} images - Array of image paths to animate.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }
  /**
   * Displays a single image from the animation array.
   * @param {Array<string>} image - Array containing a single image path.
   */
  playOneImg(image) {
    this.img = this.imageCache[image[0]];
  }
  /**
   * Moves the object to the right by adding to its x-coordinate.
   */
  moveRight() {
    this.x += this.speed;
  }
  /**
   * Moves the object to the left by subtracting from its x-coordinate.
   */
  moveLeft() {
    this.x -= this.speed;
  }
  /**
   * Determines if the object is colliding with another movable object.
   * @param {MovableObject} mo - The other movable object to check for collision.
   * @returns {boolean} True if colliding, otherwise false.
   */
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }
  /**
   * Applies damage to the object, reducing its health.
   * @param {number} damage - The amount of damage to apply.
   * @returns {number} The new health value after applying damage.
   */
  hit(damage) {
    this.health -= damage;
    if (this.health < 0) {
      this.health = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
    return this.health;
  }
  /**
   * Checks if the object is dead.
   * @returns {boolean} True if health is 0, otherwise false.
   */
  isDead() {
    return this.health <= 0;
  }
  /**
   * Checks if the object has been hurt recently.
   * @returns {boolean} True if the object was hit within the last 0.5 seconds, otherwise false.
   */
  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    timePassed = timePassed / 1000;
    return timePassed < 0.5;
  }
  /**
   * Flags the object as having been hit by a bottle.
   * @returns {boolean} Always returns true.
   */
  gotHitByBottle() {
    return (this.hitByBottle = true);
  }
  /**
   * Calculates the elapsed time since the last character action.
   * @returns {number} The elapsed time in seconds.
   */
  calculateElapsedTime() {
    let currentTime = new Date().getTime();
    let elapsedTime = currentTime - this.lastCharacterAction;
    elapsedTime = elapsedTime / 1000;
    return elapsedTime;
  }
  /**
   * Records the timestamp of the last character action.
   * @returns {number} The recorded timestamp.
   */
  measureLastCharacterAction() {
    this.lastCharacterAction = new Date().getTime();
    return this.lastCharacterAction;
  }
}
