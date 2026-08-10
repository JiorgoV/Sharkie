/** HUD bar for Sharkie's health. @extends DrawableObject */
class StatusBar extends DrawableObject {
    IMAGES = [
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/4. Marcadores/Purple/energybar_0.png', // 0
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/4. Marcadores/Purple/energybar_20.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/4. Marcadores/Purple/energybar_40.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/4. Marcadores/Purple/energybar_60.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/4. Marcadores/Purple/energybar_80.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/4. Marcadores/Purple/energybar_100.png', // 5
    ];

    percentage = 100;

    /** Creates the health bar at full health. */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercantage(100);
        this.x = 20;
        this.y = 5;
        this.width = 200;
        this.height = 60;

    }

    /**
     * Updates the health percentage and the corresponding bar image.
     * @param {number} percentage Percentage between 0 and 100.
     * @returns {void}
     */
    setPercantage(percentage) {
        this.percentage = percentage; // => 0....5
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /** @returns {number} Image index between 0 and 5. */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }

}