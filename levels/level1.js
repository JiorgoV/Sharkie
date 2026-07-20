const level1 = new Level(
    [
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
        new Light('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/3. Background/Legacy/Layers/1. Light/2.png', 360 * 5)
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
        new BackgroundObject('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/3. Background/Layers/2. Floor/D2.png', 720 * 3)
    ], [
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
    ], [
        new Poison(),
        new Poison(),
        new Poison(),
        new Poison(),
        new Poison(),
    ]
);