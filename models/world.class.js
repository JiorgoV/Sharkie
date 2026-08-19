/** Central game world for rendering, collisions, input, and game state. */
class World {
    intervallIds = [];
    character = new Character();
    endbossBar = new EndbossBar();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    throwableObjects = [];
    coinCount = 0;
    poisonCount = 0;
    heartIcon = new Image();
    coinIcon = new Image();
    poisonIcon = new Image();
    lastThrowTime = 0;
    paused = false;
    soundManager = new SoundManager();
    endbossBarVisible = false;

    /**
     * @param {HTMLCanvasElement} canvas Canvas used for game output.
     * @param {Keyboard} keyboard Current state of the game keys.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.heartIcon.src = 'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/4. Marcadores/green/100_  copia 3.png';
        this.coinIcon.src = 'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/4. Marcadores/green/100_ copia 6.png';
        this.poisonIcon.src = 'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/4. Marcadores/green/100_ copia 5.png';
        this.soundManager.loadMuteState();
        this.soundManager.play('startTheme');
        this.setWorld();
        this.draw();
        this.run();
    }

    setStoppableInterval(fn, time) {
        let id = setInterval(fn, time);
        this.intervallIds.push(id);
    }

    stopAnimations() {
        this.intervallIds.forEach(clearInterval);
    }

    stopGame() {
        this.stopAnimations();
        this.character.stopAnimations();
        this.level.enemies.forEach(enemy => enemy.stopAnimations());
        this.throwableObjects.forEach(obj => obj.stopAnimations());
        this.level.lights.forEach(light => light.stopAnimations());
    }

    /** Links the player and enemies to this world. @returns {void} */
    setWorld() {
        this.character.world = this;
        this.level.enemies.forEach(enemy => enemy.world = this);
    }

    /** Starts the recurring game and collision checks. @returns {void} */
    run() {
        this.runInterval = this.setStoppableInterval(() => {
            if (!this.paused) {
                this.checkCollisions();
                this.checkThrowObjects();
                this.checkGameOver();
                this.checkYouWin();
            }
        }, 200);
    }

    /** Stops the recurring game checks. @returns {void} */
    stopGame() {
        this.stopAnimations();
        this.character.stopAnimations();
        this.level.enemies.forEach(enemy => enemy.stopAnimations());
        this.throwableObjects.forEach(obj => obj.stopAnimations());
        this.level.lights.forEach(light => light.stopAnimations());
    }

    /** Processes enemy, coin, poison bubble, and projectile collisions. @returns {void} */
    checkCollisions() {
        this.checkEnemyCollisions();
        this.checkCoinCollisions();
        this.checkPoisonCollisions();
        this.checkBubbleCollisions();
    }

    checkEnemyCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                if (enemy instanceof PufferFish && this.isJumpingOn(enemy)) {
                    this.level.enemies = this.level.enemies.filter(e => e !== enemy);
                } else {
                    this.handleEnemyHit(enemy);
                }
            }
            this.checkEndbossFirstContact(enemy);
        });
    }

    handleEnemyHit(enemy) {
        if (enemy instanceof Endboss) {
            enemy.isAttacking = true;
            setTimeout(() => enemy.isAttacking = false, 1000);
        }
        if (enemy instanceof Jellyfish || enemy instanceof DangerousJellyfish) {
            this.character.hurtCause = 'electro';
            this.character.deadCause = 'electro';
        } else {
            this.character.hurtCause = 'poisoned';
            this.character.deadCause = 'poisoned';
        }
        this.character.hit();
        this.soundManager.play('damageHit');
    }

    checkEndbossFirstContact(enemy) {
        if (enemy instanceof Endboss && this.character.x > 3000) {
            if (!enemy.hadFirstContact) {
                enemy.hadFirstContact = true;
                this.startEndbossMusic();
            }
        }
    }

    startEndbossMusic() {
        this.soundManager.sounds.startTheme.pause();
        this.soundManager.sounds.startTheme.currentTime = 0;
        this.soundManager.sounds.backgroundFx.pause();
        this.soundManager.sounds.backgroundFx.currentTime = 0;
        this.soundManager.sounds.endbossEntry.currentTime = 0;
        this.soundManager.play('endbossEntry');
        this.soundManager.sounds.endbossEntry.loop = true;
    }

    checkCoinCollisions() {
        this.level.coins = this.level.coins.filter(coin => {
            if (this.character.isColliding(coin)) {
                this.coinCount = Math.min(this.coinCount + 1, 5);
                this.soundManager.play('coinPickup');
                return false;
            }
            return true;
        });
    }

    checkPoisonCollisions() {
        this.level.poisons = this.level.poisons.filter(poison => {
            if (this.character.isColliding(poison)) {
                this.poisonCount = Math.min(this.poisonCount + 1, 5);
                this.soundManager.play('bubblePickup');
                return false;
            }
            return true;
        });
    }

    checkBubbleCollisions() {
        this.throwableObjects = this.throwableObjects.filter(bubble => {
            let hit = false;
            this.level.enemies = this.level.enemies.filter(enemy => {
                if (bubble.isColliding(enemy) && !hit) {
                    hit = true;
                    if (enemy instanceof Endboss) {
                        enemy.hit();
                        this.endbossBar.setPercantage(enemy.energy);
                        return true;
                    } else {
                        return false;
                    }
                }
                return true;
            });
            return !hit;
        });
    }

    /** Creates attack bubbles from input with a cooldown. @returns {void} */
    checkThrowObjects() {
        let now = new Date().getTime();
        let isLeft = this.character.otherDirection;
        let offsetX = isLeft ? 20 : 220;

        if (this.keyboard.D && now - this.lastThrowTime > 200) {
            this.soundManager.play('bubbleShot');
            let bubble = new ThrowableObject(
                this.character.x + offsetX,
                this.character.y + 170,
                isLeft
            );
            this.throwableObjects.push(bubble);
            this.lastThrowTime = now;
        }

        if (this.keyboard.SPACE && now - this.lastThrowTime > 200 && this.poisonCount > 0) {
            let poisonBubble = new PoisonBubble(
                this.character.x + offsetX,
                this.character.y + 170,
                isLeft
            );
            this.throwableObjects.push(poisonBubble);
            this.poisonCount = Math.max(this.poisonCount - 1, 0);
            this.lastThrowTime = now;
        }

        this.throwableObjects = this.throwableObjects.filter(bubble => {
            return Math.abs(bubble.x - bubble.startX) < 300;
        });
    }

    /** Draws health, coin, and poison bubble counters in the fixed HUD layer. @returns {void} */
    drawStatusIcons() {
        this.ctx.font = 'bold 24px Arial';
        this.ctx.fillStyle = 'white';

        // Herz
        this.ctx.drawImage(this.heartIcon, 20, 20, 40, 40);
        this.ctx.fillText(`x ${this.character.energy}`, 65, 48);

        // Coin
        this.ctx.drawImage(this.coinIcon, 160, 20, 40, 40);
        this.ctx.fillText(`x ${this.coinCount}`, 205, 48);

        // Poison
        this.ctx.drawImage(this.poisonIcon, 260, 20, 40, 40);
        this.ctx.fillText(`x ${this.poisonCount}`, 300, 48);
    }

    /** Draws all game objects and schedules the next animation frame. @returns {void} */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.ctx.translate(-this.camera_x, 0);

        // feste UI-Elemente
        this.drawStatusIcons();
        if (this.character.x > 3000) { // ← neu
            this.endbossBarVisible = true;
        }
        if (this.endbossBarVisible) { // ← neu
            this.addToMap(this.endbossBar);
        }

        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.lights);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.poisons);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }

    /** Adds a list of objects to the rendered map.
     * @param {DrawableObject[]} objects Objects to draw.
     * @returns {void}
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /** Draws an object while respecting its facing direction.
     * @param {DrawableObject} mo Object to draw.
     * @returns {void}
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
            this.ctx.drawImage(mo.img, 0, mo.y, mo.height, mo.width);
            mo.drawFrame(this.ctx, 0);
            this.flipImageBack();
        } else {
            mo.draw(this.ctx);
            mo.drawFrame(this.ctx);
        }
    }

    /** Enables horizontal mirroring for an object.
     * @param {DrawableObject} mo Object to mirror.
     * @returns {void}
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.x + mo.height, 0);
        this.ctx.scale(-1, 1);
    }

    /** Restores the previous canvas state after mirroring. @returns {void} */
    flipImageBack() {
        this.ctx.restore();
    }

    /** Displays the game-over screen after the player dies. @returns {void} */
    checkGameOver() {
        if (this.character.isDead() && !this.gameOver) {
            this.gameOver = true;
            this.soundManager.sounds.damageHit.pause();
            this.soundManager.sounds.damageHit.currentTime = 0;
            this.soundManager.sounds.endbossEntry.pause();
            this.soundManager.sounds.startTheme.pause();
            this.soundManager.sounds.backgroundFx.pause();
            this.soundManager.play('gameOver');
            setTimeout(() => {
                document.getElementById('canvas').classList.add('hidden');
                document.getElementById('gameover-screen').classList.remove('hidden');
                document.getElementById('mobile-controls').classList.remove('show'); // ← neu
            }, 1000);
        }
    }

    /** Displays the win screen after defeating the final enemy. @returns {void} */
    checkYouWin() {
        let endboss = this.level.enemies.find(e => e instanceof Endboss);
        if (endboss && endboss.isDead() && !this.youWin) {
            this.youWin = true;
            this.soundManager.sounds.endbossEntry.pause();
            this.soundManager.play('gameOver');
            setTimeout(() => {
                document.getElementById('canvas').classList.add('hidden');
                document.getElementById('youwin-screen').classList.remove('hidden');
                document.getElementById('mobile-controls').classList.remove('show');
            }, 1000);
        }
    }

    isJumpingOn(enemy) {
        return this.character.y + this.character.height > enemy.y &&
            this.character.y < enemy.y &&
            this.character.speedY < 0;
    }
}