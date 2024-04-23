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
  }

  throw() {
    this.speedY = 20;
    const gravityInterval = this.applyGravity();
    this.throw_sound.play();
    const movementInterval = setInterval(() => {
      if (this.otherDirection) {
        this.x -= 10;
      } else {
        this.x += 10;
      }

      this.playAnimation(this.IMAGES_BOTTLE_THROWING);
      this.splash_sound.play();
      if (this.y >= 380) {
        
        this.splashAnimation(gravityInterval, movementInterval);
      }
    }, 25);
  }

  splashAnimation(gravityInterval, movementInterval) {
    
    clearInterval(gravityInterval);
    clearInterval(movementInterval);
    this.speedY = 0;
    this.y = 380;

    let animationCount = 0;
    const splashAnimation = setInterval(() => {
      
      this.playAnimation(this.IMAGES_BOTTLE_SPLASH);

      if (++animationCount > 6) {
        clearInterval(splashAnimation);
        this.world.removeThrowableObject(this);
      }
    }, 100);
  }
}
