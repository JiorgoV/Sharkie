/** Animated jellyfish enemy with a randomly selected color. @extends MovableObject */
class Jellyfish extends MovableObject {

    width = 100;
    height = 100;
    y = 50 + Math.random() * 300;

    IMAGES_SWIM_PURPLE = [
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png'
    ];

    IMAGES_SWIM_YELLOW = [
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/2 Jelly fish/Regular damage/Yellow 2.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/2 Jelly fish/Regular damage/Yellow 3.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/2 Jelly fish/Regular damage/Yellow 4.png'
    ];

    /** Creates a jellyfish with a random color, position, and speed. */
    constructor() {
        super();
        this.IMAGES_SWIM = Math.random() < 0.5 ? this.IMAGES_SWIM_YELLOW : this.IMAGES_SWIM_PURPLE;
        this.loadImage(this.IMAGES_SWIM[0]);
        this.loadImages(this.IMAGES_SWIM);
        this.x = 200 + Math.random() * 720 * 3;
        this.speed = 0.1 + Math.random() * 0.2;
        this.animate();
    }

    /** Starts the jellyfish movement and swimming animation. @returns {void} */
    animate() {
        this.moveLeft();
        setInterval(() => {
            if (this.isPaused()) return;
            this.playAnimation(this.IMAGES_SWIM);
        }, 150);
    }

}