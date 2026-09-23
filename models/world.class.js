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
    bubbleCount = 0;
    bubbleTimes = []
    bubbleCooldown = false;
    stopped = false;

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
        this.collisionManager = new CollisionManager(this);
        this.setWorld();
        this.draw();
        this.run();
    }

    /** Starts a recurring game loop that can be stopped later. @param {Function} fn Callback to run repeatedly. @param {number} time Interval in milliseconds. @returns {number} Timeout identifier. */
    setStoppableInterval(fn, time) {
        let id = setInterval(fn, time);
        this.intervallIds.push(id);
    }

    /** Stops every interval created for the world. @returns {void} */
    stopAnimations() {
        this.intervallIds.forEach(clearInterval);
    }

    /** Stops all active game loops and animations. @returns {void} */
    stopGame() {
        this.stopped = true
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

    checkCollisions() {
        this.collisionManager.checkCollisions();
    }

    /** Creates attack bubbles from input with a cooldown. @returns {void} */
    checkThrowObjects() {
        let now = new Date().getTime();
        let isLeft = this.character.otherDirection;
        let offsetX = isLeft ? 20 : 220;

        this.checkNormalBubble(now, isLeft, offsetX);
        this.checkPoisonBubble(now, isLeft, offsetX);
        this.removeFarBubbles();
    }

    /** Fires a standard bubble when the player presses the attack key and cooldown rules allow it. @param {number} now Current timestamp in milliseconds. @param {boolean} isLeft Whether the player is facing left. @param {number} offsetX Horizontal spawn offset from the character. @returns {void} */
    checkNormalBubble(now, isLeft, offsetX) {
        if (this.bubbleCooldown) return;
        if (this.keyboard.D && now - this.lastThrowTime > 200) {
            this.throwNormalBubble(now, isLeft, offsetX);
            this.updateBubbleCooldown(now);
        }
    }

    /** Spawns a normal projectile in the current facing direction. @param {number} now Current timestamp in milliseconds. @param {boolean} isLeft Whether the player is facing left. @param {number} offsetX Horizontal spawn offset from the character. @returns {void} */
    throwNormalBubble(now, isLeft, offsetX) {
        this.character.lastActivity = new Date().getTime();
        this.soundManager.play('bubbleShot');
        let bubble = new ThrowableObject(
            this.character.x + offsetX,
            this.character.y + 170,
            isLeft
        );
        this.throwableObjects.push(bubble);
        this.lastThrowTime = now;
    }

    /** Tracks recent bubble throws and temporarily disables rapid-fire attacks after repeated shots. @param {number} now Current timestamp in milliseconds. @returns {void} */
    updateBubbleCooldown(now) {
        this.bubbleTimes.push(now);
        this.bubbleTimes = this.bubbleTimes.filter(t => now - t < 2000);
        if (this.bubbleTimes.length >= 5) {
            this.bubbleCooldown = true;
            this.bubbleTimes = [];
            setTimeout(() => {
                this.bubbleCooldown = false;
            }, 1000);
        }
    }

    /** Fires a poison bubble when the player has charges and the attack cooldown is clear. @param {number} now Current timestamp in milliseconds. @param {boolean} isLeft Whether the player is facing left. @param {number} offsetX Horizontal spawn offset from the character. @returns {void} */
    checkPoisonBubble(now, isLeft, offsetX) {
        if (this.bubbleCooldown) return;
        if (this.keyboard.SPACE && now - this.lastThrowTime > 200 && this.poisonCount > 0) {
            this.throwPoisonBubble(now, isLeft, offsetX);
            this.updateBubbleCooldown(now);
        }
    }

    /** Spawns a stronger poison projectile and consumes one charge. @param {number} now Current timestamp in milliseconds. @param {boolean} isLeft Whether the player is facing left. @param {number} offsetX Horizontal spawn offset from the character. @returns {void} */
    throwPoisonBubble(now, isLeft, offsetX) {
        this.character.lastActivity = new Date().getTime();
        this.soundManager.play('bubbleShot');
        let poisonBubble = new PoisonBubble(
            this.character.x + offsetX,
            this.character.y + 170,
            isLeft
        );
        this.throwableObjects.push(poisonBubble);
        this.poisonCount = Math.max(this.poisonCount - 1, 0);
        this.lastThrowTime = now;
    }

    /** Removes projectiles that travelled too far from their origin. @returns {void} */
    removeFarBubbles() {
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
        if (this.stopped) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawBackground();
        this.drawFixedUI();
        this.drawGameObjects();
        requestAnimationFrame(() => this.draw());
    }

    /** Draws the background layers with the current camera offset. @returns {void} */
    drawBackground() {
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.ctx.translate(-this.camera_x, 0);
    }

    /** Draws the fixed HUD and reveals the endboss bar when the boss stage starts. @returns {void} */
    drawFixedUI() {
        this.drawStatusIcons();
        if (this.character.x > 4500) {
            this.endbossBarVisible = true;
        }
        if (this.endbossBarVisible) {
            this.addToMap(this.endbossBar);
        }
    }

    /** Draws the moving world objects, including enemies, pickups, and projectiles. @returns {void} */
    drawGameObjects() {
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.lights);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.poisons);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);
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

    /** Triggers the game-over flow when the player's health is exhausted. @returns {void} */
    checkGameOver() {
        if (this.character.isDead() && !this.gameOver) {
            this.gameOver = true;
            this.stopGameSounds();
            this.soundManager.play('gameOver');
            setTimeout(() => this.showGameOverScreen(), 1000);
        }
    }

    /** Stops aggressive gameplay sounds before the game-over screen is shown. @returns {void} */
    stopGameSounds() {
        this.soundManager.sounds.snore.pause();
        this.soundManager.sounds.snore.currentTime = 0;
        this.soundManager.sounds.endbossAttack.pause();
        this.soundManager.sounds.endbossAttack.currentTime = 0;
        this.soundManager.sounds.damageHit.pause();
        this.soundManager.sounds.damageHit.currentTime = 0;
        this.soundManager.sounds.endbossEntry.pause();
        this.soundManager.sounds.startTheme.pause();
        this.soundManager.sounds.backgroundFx.pause();
    }

    /** Shows the defeat screen and hides the active canvas. @returns {void} */
    showGameOverScreen() {
        document.getElementById('canvas').classList.add('hidden');
        document.getElementById('gameover-screen').classList.remove('hidden');
        document.getElementById('mobile-controls').classList.remove('show');
    }

    /** Displays the win screen after defeating the final enemy. @returns {void} */
    checkYouWin() {
        let endboss = this.level.enemies.find(e => e instanceof Endboss);
        if (endboss && endboss.isDead() && !this.youWin) {
            this.youWin = true;
            this.soundManager.sounds.endbossEntry.pause();
            this.soundManager.play('endbossDead');
            this.soundManager.play('youWin');
            setTimeout(() => {
                document.getElementById('canvas').classList.add('hidden');
                document.getElementById('youwin-screen').classList.remove('hidden');
                document.getElementById('mobile-controls').classList.remove('show');
            }, 5000);
        }
    }

}