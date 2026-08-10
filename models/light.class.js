/** Animated light object for background illumination. @extends MovableObject */
class Light extends MovableObject {
    width = 480;
    height = 360;
    y = 0;
    x = 0;
    startX;
    angle = 0;

    /**
     * @param {string} imagePath Path to the light graphic.
     * @param {number} x Initial position of the light object.
     */
    constructor(imagePath, x) {
        super();
        this.loadImage(imagePath);
        this.startX = x;
        this.x = x;
        this.y = this.y;
        this.animate();

    }

    /** Starts the sinusoidal movement of the light object. @returns {void} */
    animate() {
        setInterval(() => {
            this.angle += 0.05;
            this.x = this.startX + Math.sin(this.angle) * 20;
        }, 100);
    }
}