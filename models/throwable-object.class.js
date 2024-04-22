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

  moveLeft = this.moveLeft();

  constructor(x, y, otherDirection) {
    super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
    this.loadImages(this.IMAGES_BOTTLE_THROWING);
    this.loadImages(this.IMAGES_BOTTLE_SPLASH);
    this.height = 70;
    this.width = 70;
    this.x = x;
    this.y = y;
    this.otherDirection = otherDirection;
    this.offset = {
      top: 10,
      left: 15,
      right: 15,
      bottom: 10,
    };
    this.throw();
}

  setCollectedBottles(collectedBottles) {
    this.collectedBottles = collectedBottles;
  }

  throw() {
    this.speedY = 20; // Startgeschwindigkeit nach unten
    const gravityInterval = this.applyGravity(); // Startet die Schwerkraftwirkung

    const movementInterval = setInterval(() => {
        // Überprüft die Richtung und passt die horizontale Position entsprechend an
        if (this.otherDirection) {
            this.x -= 10; // Bewegt die Flasche nach links, wenn `otherDirection` wahr ist
        } else {
            this.x += 10; // Bewegt die Flasche nach rechts, wenn `otherDirection` falsch ist
        }

        this.playAnimation(this.IMAGES_BOTTLE_THROWING); // Spielt die Wurfanimation ab

        if (this.y >= 380) { // Angenommen, 380 ist der Boden
            this.splashAnimation(gravityInterval, movementInterval); // Startet die Splash-Animation beim Erreichen des Bodens
        }
    }, 25);
}


  splashAnimation(gravityInterval, movementInterval) {
    clearInterval(gravityInterval);
    clearInterval(movementInterval);
    this.speedY = 0;
    this.y = 380;

    let animationCount = 0; // Zähler für die Anzahl der Splash-Animationen
    const splashAnimation = setInterval(() => {
      this.playAnimation(this.IMAGES_BOTTLE_SPLASH);

      if (++animationCount > 6) {
        clearInterval(splashAnimation); // Beendet das Intervall nach 6 Durchläufen
        this.toRemove = true;
      }
    }, 50);
  }
}