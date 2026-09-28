/**
 * A stationary background image within the level. 
 * @extends MovableObject 
 */
class BackgroundObject extends MovableObject {

    width = 720;
    height = 480;


    /**
     * Creates a new BackgroundObject at the given position.
     * @param {string} imagePath - Path to the background image.
     * @param {number} x - Horizontal position in the level.
     */
    constructor(imagePath, x) {
        super();
        this.loadImage(imagePath);
        this.x = x;
        this.y = 0;

    }

}