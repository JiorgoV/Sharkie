class Level {
    enemies;
    lights;
    backgroundObjects;
    coins;
    poisons;
    level_end_x = 715 * 3;

    constructor(enemies, lights, backgroundObjects, coins, poisons) {
        this.enemies = enemies;
        this.lights = lights;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.poisons = poisons;
    }
}