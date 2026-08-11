/** Final enemy with introduction, attack, hurt, and death animations. @extends MovableObject */
class Endboss extends MovableObject {

    height = 400;
    width = 400;
    y = 60;
    hadFirstContact = false; // wird true wenn Sharkie nah genug ist
    introPlayed = false; // wird true wenn Introduce komplett durchgelaufen ist
    introFrame = 0; // zählt wie viele Introduce-Frames schon gespielt wurden

    IMAGES_INTRODUCE = [
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/1.Introduce/1.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/1.Introduce/2.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/1.Introduce/3.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/1.Introduce/4.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/1.Introduce/5.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/1.Introduce/6.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/1.Introduce/7.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/1.Introduce/8.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/1.Introduce/9.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/1.Introduce/10.png',

    ];

    IMAGES_FLOATING = [
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/2.floating/1.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/2.floating/2.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/2.floating/3.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/2.floating/4.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/2.floating/5.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/2.floating/6.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/2.floating/7.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/2.floating/8.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/2.floating/9.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/2.floating/10.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/2.floating/11.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/2.floating/12.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/2.floating/13.png'
    ];

    IMAGES_ATTACK = [
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Attack/1.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Attack/2.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Attack/3.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Attack/4.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Attack/5.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Attack/6.png'
    ];

    IMAGES_HURT = [
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Hurt/1.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Hurt/2.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Hurt/3.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Hurt/4.png'
    ];

    IMAGES_DEAD = [
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png'
    ];

    /** Creates the final enemy, loads its animations, and starts the animation cycle. */
    constructor() {
        super();
        this.loadImage(this.IMAGES_INTRODUCE[0]);
        this.loadImages(this.IMAGES_INTRODUCE);
        this.loadImages(this.IMAGES_FLOATING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 720 * 5 - 100;
        this.animate();
    }

    /** Controls the final enemy animation cycle based on its state. @returns {void} */
    animate() {
        this.setStoppableInterval(() => {
            if (this.isPaused()) return;

            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.hadFirstContact && !this.introPlayed) {
                this.playAnimation(this.IMAGES_INTRODUCE);
                this.introFrame++;
                if (this.introFrame >= this.IMAGES_INTRODUCE.length) {
                    this.introPlayed = true;
                }
            } else if (this.hadFirstContact && this.introPlayed) {
                this.playAnimation(this.IMAGES_FLOATING);
            }
        }, 200);
    }
}