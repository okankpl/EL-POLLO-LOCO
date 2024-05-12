/**
 * Represents a single level in the game, encapsulating all entities and objects within that level.
 * This class holds references to various game objects like enemies, clouds, background objects, bottles, coins, and the endboss,
 * which together compose the environment and challenges of the level.
 */
class Level {
  enemies;
  clouds;
  backgroundObjects;
  bottles;
  coins;
  endboss;
  level_end_x = 2200;
  /**
   * Constructs a new game level with specified game objects.
   * @param {Array<MovableObject>} enemies - Array of enemy objects present in the level.
   * @param {Array<MovableObject>} clouds - Array of cloud objects to decorate the sky of the level.
   * @param {Array<MovableObject>} backgroundObjects - Array of background objects for creating a parallax effect.
   * @param {Array<MovableObject>} bottles - Array of collectible bottle objects placed throughout the level.
   * @param {Array<MovableObject>} coins - Array of collectible coin objects placed throughout the level.
   * @param {MovableObject} endboss - The end boss of the level, a single entity.
   */
  constructor(enemies, clouds, backgroundObjects, bottles, coins, endboss) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.bottles = bottles;
    this.coins = coins;
    this.endboss = endboss;
  }
}
