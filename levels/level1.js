/** @type {Level} Currently initialized level. */
let level1;

/**
 * Creates level 1 with enemies, lighting, backgrounds, coins, and poison bubbles.
 * @returns {void}
 */
function initLevel() {

    level1 = new Level(
        [
            new PufferFish(),
            new PufferFish(),
            new PufferFish(),
            new PufferFish(),
            new PufferFish(),
            new PufferFish(),
            new Jellyfish(),
            new Jellyfish(),
            new DangerousJellyfish(),
            new DangerousJellyfish(),
            new Endboss()
        ], [
            new Light('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/3. Background/Legacy/Layers/1. Light/1.png', 0),
            new Light('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/3. Background/Legacy/Layers/1. Light/2.png', 360),
            new Light('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/3. Background/Legacy/Layers/1. Light/1.png', 360 * 2),
            new Light('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/3. Background/Legacy/Layers/1. Light/2.png', 360 * 3),
            new Light('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/3. Background/Legacy/Layers/1. Light/1.png', 360 * 4),
            new Light('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/3. Background/Legacy/Layers/1. Light/2.png', 360 * 5),
            new Light('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/3. Background/Legacy/Layers/1. Light/1.png', 360 * 6),
            new Light('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/3. Background/Legacy/Layers/1. Light/2.png', 360 * 7),
            new Light('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/3. Background/Legacy/Layers/1. Light/1.png', 360 * 8),
            new Light('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/3. Background/Legacy/Layers/1. Light/2.png', 360 * 9),
            new Light('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/3. Background/Legacy/Layers/1. Light/1.png', 360 * 10),
            new Light('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/3. Background/Legacy/Layers/1. Light/2.png', 360 * 11)
        ], [
            new BackgroundObject('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/3. Background/Layers/5. Water/D2.png', -720),
            new BackgroundObject('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/3. Background/Layers/3.Fondo 1/D2.png', -720),
            new BackgroundObject('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/3. Background/Layers/2. Floor/D2.png', -720),
            new BackgroundObject('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/3. Background/Layers/5. Water/D1.png', 0),
            new BackgroundObject('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/3. Background/Layers/3.Fondo 1/D1.png', 0),
            new BackgroundObject('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/3. Background/Layers/2. Floor/D1.png', 0),
            new BackgroundObject('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/3. Background/Layers/5. Water/D2.png', 720),
            new BackgroundObject('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/3. Background/Layers/3.Fondo 1/D2.png', 720),
            new BackgroundObject('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/3. Background/Layers/2. Floor/D2.png', 720),
            new BackgroundObject('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/3. Background/Layers/5. Water/D1.png', 720 * 2),
            new BackgroundObject('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/3. Background/Layers/3.Fondo 1/D1.png', 720 * 2),
            new BackgroundObject('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/3. Background/Layers/2. Floor/D1.png', 720 * 2),
            new BackgroundObject('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/3. Background/Layers/5. Water/D2.png', 720 * 3),
            new BackgroundObject('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/3. Background/Layers/3.Fondo 1/D2.png', 720 * 3),
            new BackgroundObject('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/3. Background/Layers/2. Floor/D2.png', 720 * 3),
            new BackgroundObject('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/3. Background/Layers/5. Water/D1.png', 720 * 4),
            new BackgroundObject('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/3. Background/Layers/3.Fondo 1/D1.png', 720 * 4),
            new BackgroundObject('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/3. Background/Layers/2. Floor/D1.png', 720 * 4),
            new BackgroundObject('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/3. Background/Layers/5. Water/D2.png', 720 * 5),
            new BackgroundObject('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/3. Background/Layers/3.Fondo 1/D2.png', 720 * 5),
            new BackgroundObject('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/3. Background/Layers/2. Floor/D2.png', 720 * 5),
            new BackgroundObject('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/3. Background/Layers/5. Water/D1.png', 720 * 6),
            new BackgroundObject('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/3. Background/Layers/3.Fondo 1/D1.png', 720 * 6),
            new BackgroundObject('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/3. Background/Layers/2. Floor/D1.png', 720 * 6),
            new BackgroundObject('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/3. Background/Layers/5. Water/D2.png', 720 * 7),
            new BackgroundObject('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/3. Background/Layers/3.Fondo 1/D2.png', 720 * 7),
            new BackgroundObject('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/3. Background/Layers/2. Floor/D2.png', 720 * 7),

        ], [
            new Coin(300, 200),
            new Coin(800, 150),
            new Coin(1200, 300),
            new Coin(1800, 200),
            new Coin(2400, 250),
            new Coin(2900, 200),
            new Coin(3300, 150),
            new Coin(3700, 300),
            new Coin(3700, 150),
            new Coin(4000, 250)
        ], [
            new Poison(500, 250),
            new Poison(1000, 180),
            new Poison(1600, 300),
            new Poison(2200, 200),
            new Poison(2800, 250),
            new Poison(3000, 250),
            new Poison(3300, 180),
            new Poison(3550, 300),
            new Poison(3900, 150),
            new Poison(3900, 300),
            new Poison(4200, 250)
        ]
    );
}