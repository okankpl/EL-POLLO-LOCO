let level1;

function initLevel() {
  level1 = new Level(
    [
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chick(),
      new Chick(),
      new Chick(),
    ],

    [new Cloud()],

    [
      new BackgroundObject("img/5_background/layers/air.png", -719),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", -719),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/2.png",
        -719
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/2.png",
        -719,
        480
      ),

      new BackgroundObject("img/5_background/layers/air.png", 0),
      new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 0),
      new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 0),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/1.png",
        0,
        480
      ),

      new BackgroundObject("img/5_background/layers/air.png", 719),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719),
      new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/2.png",
        719,
        480
      ),

      new BackgroundObject("img/5_background/layers/air.png", 2 * 719),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/1.png",
        2 * 719
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/1.png",
        2 * 719
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/1.png",
        2 * 719,
        480
      ),

      new BackgroundObject("img/5_background/layers/air.png", 3 * 719),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/2.png",
        3 * 719
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/2.png",
        3 * 719
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/2.png",
        3 * 719,
        480
      ),
    ],

    [
      new Bottles(),
      new Bottles(),
      new Bottles(),
      new Bottles(),
      new Bottles(),
      new Bottles(),
      new Bottles(),
      new Bottles(),
      new Bottles(),
    ],

    [
      new Coins(),
      new Coins(),
      new Coins(),
      new Coins(),
      new Coins(),
      new Coins(),
      new Coins(),
    ],
    [new Endboss()]
  );
}
