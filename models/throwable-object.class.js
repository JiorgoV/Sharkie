/** Movable bubble fired by the player. @extends MovableObject */
class ThrowableObject extends MovableObject {

    /**
     * @param {number} x Starting position on the x-axis.
     * @param {number} y Starting position on the y-axis.
     * @param {boolean} otherDirection Whether the bubble flies to the left.
     */
    constructor(x, y, otherDirection) {
        super();
        this.loadImage('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/4.Attack/Bubble trap/Bubble.png');
        this.x = x;
        this.y = y;
        this.height = 50;
        this.width = 50;
        this.throw(otherDirection);
    }

    /**
     * Starts the horizontal movement of the bubble.
     * @param {boolean} otherDirection Flight direction: `true` means left.
     * @returns {void}
     */
    throw (otherDirection) {
        setInterval(() => {
            this.x += otherDirection ? -10 : 10;
        }, 25);
    }
}