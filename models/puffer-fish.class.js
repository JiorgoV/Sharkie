/** Animated puffer fish enemy. @extends MovableObject */
class PufferFish extends MovableObject {

    width = 160;
    height = 160;
    y = 300;
    IMAGES_SWIM = [
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim1.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim2.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim3.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim4.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim5.png'
    ];

    /** Creates a puffer fish at a random position. */
    constructor() {
        super();
        this.loadImage('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim1.png');
        this.loadImages(this.IMAGES_SWIM);
        this.x = 200 + Math.random() * 720 * 3;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    /** Starts the puffer fish movement and swimming animation. @returns {void} */
    animate() {
        this.moveLeft();
        setInterval(() => {
            if (this.isPaused()) return;
            this.playAnimation(this.IMAGES_SWIM);
        }, 150);
    }

}