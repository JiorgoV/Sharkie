/**
 * Visible object with movement, gravity, and health.
 * @extends DrawableObject
 */
class MovableObject extends DrawableObject {
    x = 120;
    y = 280;
    height = 200;
    width = 200;
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 1;
    energy = 100;
    lastHit = 0;
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };

    intervallIds = [];


    /** Starts a timed callback that can be stopped later. @param {Function} fn Callback to run repeatedly. @param {number} time Interval in milliseconds. @returns {void} */
    setStoppableInterval(fn, time) {
        let id = setInterval(fn, time);
        this.intervallIds.push(id);
    }

    /** Stops every active interval registered on this object. @returns {void} */
    stopAnimations() {
        this.intervallIds.forEach(clearInterval);
    }


    /** Starts the repeated gravity calculation. @returns {void} */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * Checks whether the object is above the ground level.
     * @returns {boolean} `true` when the object is airborne.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 180;
        }
    }

    /**
     * Checks rectangular collision with another object.
     * @param {MovableObject} mo Object to check.
     * @returns {boolean} `true` when the collision frames overlap.
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    /** Reduces health by five points and updates the hit timestamp. @returns {void} */
    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /** @returns {boolean} `true` when no health remains. */
    isDead() {
        return this.energy == 0;
    }

    /** @returns {boolean} `true` when the last hit occurred less than 0.5 seconds ago. */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
        timepassed = timepassed / 1000; // Differnce in s
        return timepassed < 0.5;
    }


    /**
     * Sets the next image in an animation sequence.
     * @param {string[]} images Image paths in the animation sequence.
     * @returns {void}
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /** Moves the object one step to the right. @returns {void} */
    moveRight() {
        this.x += this.speed;

    }

    /** Starts continuous movement to the left. @returns {void} */
    moveLeft() {
        this.moveLeftInterval = setInterval(() => {
            if (this.isPaused()) return;
            this.x -= this.speed;
        }, 1000 / 60);
    }

    /** Sets the vertical velocity for a jump. @returns {void} */
    jump() {
        this.speedY = 20;
        this.world.soundManager.play('jump');
    }

    /** Returns whether the owning world is currently paused. @returns {boolean|undefined} Pause state when a world is assigned. */
    isPaused() {
        return this.world && this.world.paused;
    }
}