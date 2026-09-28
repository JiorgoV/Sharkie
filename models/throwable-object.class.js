/** 
 * Movable bubble fired by the player. 
 * @extends MovableObject 
 */
class ThrowableObject extends MovableObject {

    /**
     * Creates a normal bubble and launches it in the given direction.
     * @param {number} x 
     * @param {number} y 
     * @param {boolean} otherDirection 
     */
    constructor(x, y, otherDirection) {
        super();
        this.loadImage('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/4.Attack/Bubble trap/Bubble.png');
        this.x = x;
        this.y = y;
        this.startX = x
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
        this.setStoppableInterval(() => {
            if (this.isPaused()) return;
            this.x += otherDirection ? -10 : 10;
        }, 25);
    }
}