/** HUD bar for the final enemy's health. @extends DrawableObject */
class EndbossBar extends DrawableObject {
    IMAGES = [
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/4. Marcadores/orange/0_  copia.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/4. Marcadores/orange/20_ copia 2.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/4. Marcadores/orange/40_  copia.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/4. Marcadores/orange/60_  copia.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/4. Marcadores/orange/80_  copia.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/4. Marcadores/orange/100_  copia.png',
    ];

    percentage = 100;

    /** Creates the final enemy bar at full health. */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercantage(100);
        this.x = 500; // oben rechts
        this.y = 20;
        this.width = 200;
        this.height = 60;
    }

    /**
     * Updates the final enemy health percentage.
     * @param {number} percentage Percentage between 0 and 100.
     * @returns {void}
     */
    setPercantage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /** @returns {number} Image index between 0 and 5. */
    resolveImageIndex() {
        if (this.percentage == 100) return 5;
        else if (this.percentage > 80) return 4;
        else if (this.percentage > 60) return 3;
        else if (this.percentage > 40) return 2;
        else if (this.percentage > 20) return 1;
        else return 0;
    }
}