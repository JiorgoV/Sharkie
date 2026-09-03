/** Fast jellyfish enemy that causes electric damage. @extends Jellyfish */
class DangerousJellyfish extends Jellyfish {

    IMAGES_SWIM_GREEN = [
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/2 Jelly fish/Súper dangerous/Green 1.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/2 Jelly fish/Súper dangerous/Green 2.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/2 Jelly fish/Súper dangerous/Green 3.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/2 Jelly fish/Súper dangerous/Green 4.png'
    ];

    IMAGES_SWIM_PINK = [
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/2 Jelly fish/Súper dangerous/Pink 1.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/2 Jelly fish/Súper dangerous/Pink 2.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/2 Jelly fish/Súper dangerous/Pink 3.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/2 Jelly fish/Súper dangerous/Pink 4.png'
    ];


    /** Creates a dangerous jellyfish and overrides its speed. */
    constructor() {
        super();
        this.loadImage(this.IMAGES_SWIM[0]);
        this.loadImages(this.IMAGES_SWIM);
        this.x = 500 + Math.random() * 720 * 4;
        this.speed = 0.3 + Math.random() * 0.3;
    }

    /** Starts the dangerous jellyfish movement and swimming animation. @returns {void} */
    animate() {
        this.moveLeft();
        this.setStoppableInterval(() => {
            if (this.isPaused()) return;
            this.playAnimation(this.IMAGES_SWIM);
        }, 150);
    }
}