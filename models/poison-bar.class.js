/** HUD bar for poison bubble progress. @extends DrawableObject */
class PoisonBar extends DrawableObject {
    IMAGES = [
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/4. Marcadores/Purple/poisonbar_0.png', // 0
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/4. Marcadores/Purple/poisonbar_20.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/4. Marcadores/Purple/poisonbar_40.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/4. Marcadores/Purple/poisonbar_60.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/4. Marcadores/Purple/poisonbar_80.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/4. Marcadores/Purple/poisonbar_100.png', // 5
    ];

    percentage = 0;

    /** Creates the poison bar and sets its initial value to zero percent. */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercantage(0);
        this.x = 20;
        this.y = 100;
        this.width = 200;
        this.height = 60;

    }

    /**
     * Updates the percentage and the corresponding bar image.
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