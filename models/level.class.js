class Level {
    enemies;
    clouds;
    backgroundObjects;
    bottles;
    coins;
    endboss;
    chick;
    level_end_x = 2200;

    constructor(enemies, clouds, backgroundObjects,bottles,coins, endboss, chick) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;   
        this.bottles = bottles;
        this.coins = coins;
        this.endboss = endboss;
        this.chick = chick;
    }
}