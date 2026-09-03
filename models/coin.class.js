/** Collectible animated coin. @extends MovableObject */
class Coin extends MovableObject {

    width = 80;
    height = 80;

    IMAGES = [
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/4. Marcadores/1. Coins/1.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/4. Marcadores/1. Coins/2.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/4. Marcadores/1. Coins/3.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/4. Marcadores/1. Coins/4.png',
    ];

    /** Creates a coin at a given or random position and starts its animation.
     * @param {number} [x] - X position. Random if not provided.
     * @param {number} [y] - Y position. Random if not provided.
     */
    constructor(x, y) {
        super();
        this.loadImage(this.IMAGES[0]);
        this.loadImages(this.IMAGES);
        this.x = x || 200 + Math.random() * 720 * 3;
        this.y = y || 50 + Math.random() * 350;
        this.animate();
    }

    /** Starts the coin animation. @returns {void} */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 150);
    }
}