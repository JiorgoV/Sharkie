class CollisionManager {

    constructor(world) {
        this.world = world;
    }

    /** Processes enemy, coin, poison bubble, and projectile collisions. @returns {void} */
    checkCollisions() {
        this.checkEnemyCollisions();
        this.checkCoinCollisions();
        this.checkPoisonCollisions();
        this.checkBubbleCollisions();
    }

    /** Handles collisions against enemy objects and triggers damage or enemy defeat logic. @returns {void} */
    checkEnemyCollisions() {
        if (this.world.youWin) return;
        if (this.world.character.isDead()) return;
        this.world.level.enemies.forEach((enemy) => {
            if (this.world.character.isColliding(enemy)) {
                if (enemy instanceof PufferFish && this.isJumpingOn(enemy)) {
                    this.world.level.enemies = this.world.level.enemies.filter(e => e !== enemy);
                    this.world.character.bounce();
                    this.world.soundManager.play('enemyDead');
                    this.world.soundManager.play('pufferFishHit');
                } else if (!this.world.character.isHurt()) {
                    this.handleEnemyHit(enemy);
                }
            }
            this.checkEndbossFirstContact(enemy);
        });
    }

    /** Applies the result of an enemy collision to the player and plays damage feedback. @param {MovableObject} enemy Enemy that collided with the player. @returns {void} */
    handleEnemyHit(enemy) {
        this.applyEnemyDamage(enemy);
        this.setHurtCause(enemy);
        if (!this.world.soundManager.isPlaying('damageHit')) {
            this.world.soundManager.play('damageHit');
        }
    }

    /** Reduces the player's health based on the enemy type and attack intensity. @param {MovableObject} enemy Enemy that inflicted the damage. @returns {void} */
    applyEnemyDamage(enemy) {
        if (enemy instanceof Endboss) {
            this.world.character.energy -= enemy.isAttacking ? 10 : 5;
            if (this.world.character.energy < 0) this.world.character.energy = 0;
        } else {
            this.world.character.hit();
        }
    }

    /** Stores the correct damage state for the current enemy type. @param {MovableObject} enemy Enemy that caused the hit. @returns {void} */
    setHurtCause(enemy) {
        if (enemy instanceof Jellyfish || enemy instanceof DangerousJellyfish) {
            this.world.character.hurtCause = 'electro';
            this.world.character.deadCause = 'electro';
        } else {
            this.world.character.hurtCause = 'poisoned';
            this.world.character.deadCause = 'poisoned';
        }
    }

    /** Triggers the endboss intro when the player reaches the boss trigger zone. @param {MovableObject} enemy Enemy to inspect. @returns {void} */
    checkEndbossFirstContact(enemy) {
        if (enemy instanceof Endboss && this.world.character.x > 4500) {
            if (!enemy.hadFirstContact) {
                enemy.hadFirstContact = true;
                this.startEndbossMusic();
            }
        }
    }

    /** Switches the music from the normal theme to the boss battle theme. @returns {void} */
    startEndbossMusic() {
        this.world.soundManager.sounds.startTheme.pause();
        this.world.soundManager.sounds.startTheme.currentTime = 0;
        this.world.soundManager.sounds.backgroundFx.pause();
        this.world.soundManager.sounds.backgroundFx.currentTime = 0;
        this.world.soundManager.sounds.endbossEntry.currentTime = 0;
        this.world.soundManager.sounds.endbossEntry.loop = true;
        let musicVolume = localStorage.getItem('musicVolume') !== null ? parseFloat(localStorage.getItem('musicVolume')) : 0.5;
        this.world.soundManager.sounds.endbossEntry.volume = musicVolume;
        if (!this.world.soundManager.muted && musicVolume > 0) {
            this.world.soundManager.play('endbossEntry');
        }
    }

    /** Collects nearby coins and updates the coin counter. @returns {void} */
    checkCoinCollisions() {
        this.world.level.coins = this.world.level.coins.filter(coin => {
            if (this.world.character.isColliding(coin)) {
                this.world.coinCount = Math.min(this.world.coinCount + 1, 10);
                this.world.soundManager.play('coinPickup');
                return false;
            }
            return true;
        });
    }

    /** Collects nearby poison pickups and updates the poison counter. @returns {void} */
    checkPoisonCollisions() {
        this.world.level.poisons = this.world.level.poisons.filter(poison => {
            if (this.world.character.isColliding(poison)) {
                this.world.poisonCount = Math.min(this.world.poisonCount + 1, 10);
                this.world.soundManager.play('bubblePickup');
                return false;
            }
            return true;
        });
    }

    /** Resolves projectile hits against enemies and removes defeated targets from the level. @returns {void} */
    checkBubbleCollisions() {
        this.world.throwableObjects = this.world.throwableObjects.filter(bubble => {
            let hit = false;
            this.world.level.enemies = this.world.level.enemies.filter(enemy => {
                if (bubble.isColliding(enemy) && !hit) {
                    hit = true;
                    return this.handleBubbleHit(enemy);
                }
                return true;
            });
            return !hit;
        });
    }

    /** Applies the hit effect of a projectile to a specific enemy. @param {MovableObject} enemy Enemy struck by the bubble. @returns {boolean} `true` when the enemy stays in the level, `false` when defeated. */
    handleBubbleHit(enemy) {
        if (enemy instanceof Endboss) {
            enemy.hit();
            this.world.endbossBar.setPercantage(enemy.energy);
            this.world.soundManager.play('endbossHurt');
            return true;
        }
        this.playEnemyDeathSound(enemy);
        return false;
    }

    /** Plays the correct death sound based on the type of enemy that was defeated. @param {MovableObject} enemy Defeated enemy. @returns {void} */
    playEnemyDeathSound(enemy) {
        if (enemy instanceof PufferFish) {
            this.world.soundManager.play('pufferFishHit');
        } else if (enemy instanceof Jellyfish || enemy instanceof DangerousJellyfish) {
            this.world.soundManager.play('jellyfishHit');
        }
        this.world.soundManager.play('enemyDead');
    }


    /** Checks whether the player jumped onto an enemy from above. @param {MovableObject} enemy Enemy being evaluated. @returns {boolean} `true` when the player stomps the enemy from above. */
    isJumpingOn(enemy) {
        return this.world.character.y + this.world.character.height > enemy.y &&
            this.world.character.y < enemy.y &&
            this.world.character.speedY < -8 &&
            !this.world.keyboard.RIGHT &&
            !this.world.keyboard.LEFT;
    }
}