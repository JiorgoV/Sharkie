class World {
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

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.heartIcon.src = 'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/4. Marcadores/green/100_  copia 3.png';
        this.coinIcon.src = 'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/4. Marcadores/green/100_ copia 6.png';
        this.poisonIcon.src = 'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/4. Marcadores/green/100_ copia 5.png';
        this.setWorld();
        this.draw();
        this.run();
    }

    setWorld() {
        this.character.world = this;
        this.level.enemies.forEach(enemy => enemy.world = this);
    }

    run() {
        this.runInterval = setInterval(() => {
            if (!this.paused) {
                this.checkCollisions();
                this.checkThrowObjects();
                this.checkGameOver();
                this.checkYouWin();
            }
        }, 200);
    }

    stopGame() {
        clearInterval(this.runInterval);
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                if (enemy instanceof Jellyfish || enemy instanceof DangerousJellyfish) {
                    this.character.hurtCause = 'electro';
                    this.character.deadCause = 'electro';
                } else {
                    this.character.hurtCause = 'poisoned';
                    this.character.deadCause = 'poisoned';
                }
                this.character.hit();
            }

            if (enemy instanceof Endboss && this.character.x > 2000) {
                enemy.hadFirstContact = true;
            }
        });

        this.level.coins = this.level.coins.filter(coin => {
            if (this.character.isColliding(coin)) {
                this.coinCount = Math.min(this.coinCount + 1, 5);
                return false;
            }
            return true;
        });

        this.level.poisons = this.level.poisons.filter(poison => {
            if (this.character.isColliding(poison)) {
                this.poisonCount = Math.min(this.poisonCount + 1, 5);
                return false;
            }
            return true;
        });

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
            return !hit; // bubble entfernen wenn sie getroffen hat
        });
    }

    checkThrowObjects() {
        let now = new Date().getTime();

        if (this.keyboard.D && now - this.lastThrowTime > 100) { //  Cooldown
            let bubble = new ThrowableObject(this.character.x + 220, this.character.y + 170);
            this.throwableObjects.push(bubble);
            this.lastThrowTime = now;
        }

        if (this.keyboard.SPACE && now - this.lastThrowTime > 100 && this.poisonCount > 0) {
            let poisonBubble = new PoisonBubble(this.character.x + 220, this.character.y + 170);
            this.throwableObjects.push(poisonBubble);
            this.poisonCount = Math.max(this.poisonCount - 1, 0);
            this.lastThrowTime = now;
        }
    }

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

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.ctx.translate(-this.camera_x, 0);

        // feste UI-Elemente
        this.drawStatusIcons();
        if (this.character.x > 1600) {
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

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

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

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.x + mo.height, 0);
        this.ctx.scale(-1, 1);
    }

    flipImageBack() {
        this.ctx.restore();
    }

    checkGameOver() {
        if (this.character.isDead() && !this.gameOver) {
            this.gameOver = true;
            setTimeout(() => {
                document.getElementById('canvas').classList.add('hidden');
                document.getElementById('gameover-screen').classList.remove('hidden');
            }, 1000);
        }
    }

    checkYouWin() {
        let endboss = this.level.enemies.find(e => e instanceof Endboss);
        if (endboss && endboss.isDead() && !this.youWin) {
            this.youWin = true;
            setTimeout(() => {
                document.getElementById('canvas').classList.add('hidden');
                document.getElementById('youwin-screen').classList.remove('hidden');
            }, 1000);
        }
    }
}