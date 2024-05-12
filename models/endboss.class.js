/**
 * Represents the end boss in the game, specifically a boss chicken character.
 * This class manages the end boss's animations, movements, health, and interactions with the player,
 * including different states like alert, walking, attacking, being hurt, and dead.
 *
 * @extends MovableObject  Inherits methods and properties from the MovableObject class,
 *                         which includes basic image handling, movement capabilities, and health management.
 */
class Endboss extends MovableObject {
  IMAGES_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_ATTACK = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];
  world;
  /**
   * Constructs a new end boss object.
   * Initializes the end boss with a set of animation states and positions the boss at a specified location.
   */
  constructor() {
    super().loadImage("img/4_enemie_boss_chicken/2_alert/G5.png");
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.x = 2100;
    this.animate();
    this.health = 5;
    this.endbossIsDead = false;
    this.offset = {
      top: 50,
      left: 25,
      right: 25,
      bottom: 25,
    };
  }
  /**
   * Initiates and manages the animation loop for the end boss.
   * Adjusts animations based on the boss's state and position.
   */
  animate() {
    setInterval(() => {
      if (this.health <= 0) {
        this.playAnimation(this.IMAGES_DEAD);
      }
      if (this.x == 2100) {
        this.playAnimation(this.IMAGES_ALERT);
      }
      if (this.x < 2100 && this.health > 0) {
        this.playAnimation(this.IMAGES_WALKING);
      }
      if (this.attackDistance < 150) {
        this.playAnimation(this.IMAGES_ATTACK);
      }
      if (this.hitByBottle) {
        this.playAnimation(this.IMAGES_HURT);
        this.hitByBottle = false;
      }
    }, 200);
  }
  /**
   * Manages the movement of the end boss, allowing it to start moving after a delay.
   */
  moveEndboss() {
    setTimeout(() => {
      setInterval(() => {
        if (this.health > 0) {
          this.moveLeft();
        }
      }, 1500 / 60);
    }, 1000);
  }
}
