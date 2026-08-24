/** Player-controlled Sharkie with movement and state animations. @extends MovableObject */
class Character extends MovableObject {

    height = 320;
    width = 280;
    x = 0;
    y = 90;
    speed = 10;
    hurtCause = 'poisoned';
    deadCause = 'poisoned';
    IMAGES_IDLE = [
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/1.IDLE/1.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/1.IDLE/2.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/1.IDLE/3.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/1.IDLE/4.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/1.IDLE/5.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/1.IDLE/6.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/1.IDLE/7.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/1.IDLE/8.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/1.IDLE/9.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/1.IDLE/10.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/1.IDLE/11.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/1.IDLE/12.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/1.IDLE/13.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/1.IDLE/14.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/1.IDLE/15.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/1.IDLE/16.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/1.IDLE/17.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/1.IDLE/18.png'
    ];

    IMAGES_SWIM = [
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/3.Swim/1.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/3.Swim/2.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/3.Swim/3.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/3.Swim/4.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/3.Swim/5.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/3.Swim/6.png',
    ];

    IMAGES_DEAD = [
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/1.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/2.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/3.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/4.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/5.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/6.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/7.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/8.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/9.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/10.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/11.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/12.png',
    ]

    IMAGES_HURT = [
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/5.Hurt/1.Poisoned/2.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/5.Hurt/1.Poisoned/3.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/5.Hurt/1.Poisoned/4.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/5.Hurt/1.Poisoned/5.png'

    ]

    IMAGES_DEAD_POISONED = [
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/1.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/2.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/3.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/4.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/5.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/6.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/7.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/8.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/9.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/10.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/11.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/12.png',
    ];

    IMAGES_DEAD_ELECTRO = [
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/2.Electro_shock/1.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/2.Electro_shock/2.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/2.Electro_shock/3.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/2.Electro_shock/4.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/2.Electro_shock/5.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/2.Electro_shock/6.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/2.Electro_shock/7.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/2.Electro_shock/8.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/2.Electro_shock/9.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/2.Electro_shock/10.png',
    ];

    IMAGES_HURT_POISONED = [
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/5.Hurt/1.Poisoned/1.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/5.Hurt/1.Poisoned/2.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/5.Hurt/1.Poisoned/3.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/5.Hurt/1.Poisoned/4.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/5.Hurt/1.Poisoned/5.png',
    ];

    IMAGES_HURT_ELECTRO = [
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/5.Hurt/2.Electric shock/1.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/5.Hurt/2.Electric shock/2.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/5.Hurt/2.Electric shock/3.png',
    ];

    IMAGES_SLEEP = [
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/2.Long_IDLE/i1.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/2.Long_IDLE/i2.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/2.Long_IDLE/i3.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/2.Long_IDLE/i4.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/2.Long_IDLE/i5.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/2.Long_IDLE/i6.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/2.Long_IDLE/i7.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/2.Long_IDLE/i8.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/2.Long_IDLE/i9.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/2.Long_IDLE/i10.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/2.Long_IDLE/i11.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/2.Long_IDLE/i12.png'
    ]

    offset = {
        top: 150,
        bottom: 60,
        left: 50,
        right: 50
    };

    lastActivity = new Date().getTime();

    world;


    /** Creates Sharkie, loads all animations, and starts gravity and animation. */
    constructor() {
        super();
        this.loadImage('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/1.IDLE/1.png');
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_SWIM);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_HURT_POISONED);
        this.loadImages(this.IMAGES_HURT_ELECTRO);
        this.loadImages(this.IMAGES_DEAD_POISONED);
        this.loadImages(this.IMAGES_DEAD_ELECTRO);
        this.loadImages(this.IMAGES_SLEEP);
        this.applyGravity();
        this.animate();
    }


    /** Processes input and selects the appropriate Sharkie animation. @returns {void} */
    animate() {
        this.setStoppableInterval(() => {
            if (this.isPaused()) return;
            if (this.isDead()) return;
            this.handleMovement();
            this.updateCamera();
        }, 1000 / 60);

        this.setStoppableInterval(() => {
            if (this.isPaused()) return;
            this.handleAnimation();
        }, 110);
    }

    handleMovement() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.x += this.speed;
            this.otherDirection = false;
            this.lastActivity = new Date().getTime();
        }

        if (this.world.keyboard.LEFT && this.x > -640) {
            this.x -= this.speed;
            this.otherDirection = true;
            this.lastActivity = new Date().getTime();
        }

        if (this.world.keyboard.UP && !this.isAboveGround()) {
            this.jump();
            this.lastActivity = new Date().getTime();
        }
    }

    updateCamera() {
        this.world.camera_x = -this.x + 40;
    }

    handleAnimation() {
        if (this.isDead()) {
            let deadImages = this.deadCause === 'electro' ? this.IMAGES_DEAD_ELECTRO : this.IMAGES_DEAD_POISONED;
            this.playAnimation(deadImages);
        } else if (this.isHurt()) {
            let hurtImages = this.hurtCause === 'electro' ? this.IMAGES_HURT_ELECTRO : this.IMAGES_HURT_POISONED;
            this.playAnimation(hurtImages);
        } else if (this.isSleeping()) {
            this.playAnimation(this.IMAGES_SLEEP);
            this.world.soundManager.play('snore');
        } else if (this.isAboveGround() || this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_SWIM);
        } else {
            this.playAnimation(this.IMAGES_IDLE);
        }
    }

    /**
     * Checks whether Sharkie has received no input for at least 15 seconds.
     * @returns {boolean} `true` when the sleep animation should be played.
     */
    isSleeping() {
        let timepassed = new Date().getTime() - this.lastActivity;
        return timepassed > 15000;
    }

    bounce() {
        this.speedY = 15; // ← nach oben springen
    }

}