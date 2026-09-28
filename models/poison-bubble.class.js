/** 
 * Poison bubble fired by the player. 
 * @extends ThrowableObject 
 */
class PoisonBubble extends ThrowableObject {

    /**
     * @param {number} x 
     * @param {number} y 
     */
    constructor(x, y, otherDirection) {
        super(x, y, otherDirection);
        this.loadImage('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png');
    }
}