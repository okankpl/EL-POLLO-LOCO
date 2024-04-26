class ThrowableObject extends MovableObject {
  IMAGES_BOTTLE_THROWING = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGES_BOTTLE_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  throw_sound = new Audio("audio/throw.mp3");
  splash_sound = new Audio("audio/breaking_bottle.mp3");

  constructor(x, y, otherDirection, world) {
    super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
    this.loadImages(this.IMAGES_BOTTLE_THROWING);
    this.loadImages(this.IMAGES_BOTTLE_SPLASH);
    this.height = 70;
    this.width = 70;
    this.x = x;
    this.y = y;
    this.otherDirection = otherDirection;
    this.world = world;
    this.offset = {
      top: 20,
      left: 25,
      right: 25,
      bottom: 20,
    };
    this.throw();
    this.hit = false;
  }

  throw() {
    this.speedY = 20;
    this.speedX = 10;
    this.throw_sound.play();
    this.applyGravity();
    setInterval(() => {
      if (this.otherDirection) {
        this.x -= this.speedX;
      } else {
        this.x += this.speedX;
      }

      if (this.y == 377.5 || this.hit) {
        this.speedY = 0;
        this.speedX = 0;
        this.splashAnimation();
      } else {
        this.playAnimation(this.IMAGES_BOTTLE_THROWING);
      }
      if (this.speedY == 0) {
        this.splash_sound.play();
      }
    }, 25);
  }

  splashAnimation() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
    }, 100);
    setTimeout(() => {
      this.world.removeThrowableObject(this);
    }, 600);
  }
}
