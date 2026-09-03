/** Collectible poison bubble. @extends MovableObject */
class Poison extends MovableObject {

    width = 80;
    height = 80;

    /** Creates a poison bubble at a given or random position.
     * @param {number} [x] - X position. Random if not provided.
     * @param {number} [y] - Y position. Random if not provided.
     */
    constructor(x, y) {
        super();
        this.loadImage('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png');
        this.x = x || 200 + Math.random() * 720 * 3;
        this.y = y || 50 + Math.random() * 350;
    }
}