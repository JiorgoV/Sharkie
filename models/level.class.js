/** Contains all objects and boundaries of a game level. */
class Level {
    enemies;
    lights;
    backgroundObjects;
    coins;
    poisons;
    level_end_x = 715 * 5;

    /**
     * @param {MovableObject[]} enemies Level enemies.
     * @param {Light[]} lights Level lighting objects.
     * @param {BackgroundObject[]} backgroundObjects Background layers.
     * @param {Coin[]} coins Collectible coins.
     * @param {Poison[]} poisons Collectible poison bubbles.
     */
    constructor(enemies, lights, backgroundObjects, coins, poisons) {
        this.enemies = enemies;
        this.lights = lights;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.poisons = poisons;
    }
}