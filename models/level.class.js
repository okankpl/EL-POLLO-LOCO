class Level {
    enemies;
    clouds;
    backgroundObjects;
    bottles;
    coins;
    endboss;
    level_end_x = 2200;

    constructor(enemies, clouds, backgroundObjects,bottles,coins, endboss) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;   
        this.bottles = bottles;
        this.coins = coins;
        this.endboss = endboss;
    }
}