class World {
    character = new Character();
    statusBar = new StatusBar();
    poisonBar = new PoisonBar();
    coinBar = new CoinBar();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    throwableObjects = [];
    endbossBar = new EndbossBar();

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }


    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {

            this.checkCollisions();
            this.checkThrowObjects();
        }, 200);
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBar.setPercantage(this.character.energy);
            }
        });

        this.level.coins = this.level.coins.filter(coin => {
            if (this.character.isColliding(coin)) {
                this.coinBar.setPercantage(this.coinBar.percentage + 20);
                console.log('Coin collected, percentage:', this.coinBar.percentage);
                return false; // coin entfernen
            }
            return true;
        });

        this.level.poisons = this.level.poisons.filter(poison => {
            if (this.character.isColliding(poison)) {
                this.poisonBar.setPercantage(this.poisonBar.percentage + 20);
                return false; // poison entfernen
            }
            return true;
        });

        this.throwableObjects.forEach((bubble) => {
            this.level.enemies = this.level.enemies.filter(enemy => {
                if (bubble.isColliding(enemy)) {
                    if (enemy instanceof Endboss) {
                        enemy.hit();
                        this.endbossBar.setPercantage(enemy.energy);
                    } else {
                        return false; // normaler Gegner stirbt sofort
                    }
                }
                return true;
            });
        });
    }

    checkThrowObjects() {
        if (this.keyboard.D && !this.lastThrow) {
            let bubble = new ThrowableObject(this.character.x + 220, this.character.y + 170);
            this.throwableObjects.push(bubble);
            this.lastThrow = true;
        }

        if (this.keyboard.SPACE && !this.lastThrow && this.poisonBar.percentage > 0) {
            let poisonBubble = new PoisonBubble(this.character.x + 220, this.character.y + 170);
            this.throwableObjects.push(poisonBubble);
            this.poisonBar.setPercantage(this.poisonBar.percentage - 20);
            this.lastThrow = true;
        }

        if (!this.keyboard.D && !this.keyboard.SPACE) {
            this.lastThrow = false;
        }
    }

    draw() {


        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0); // Back
        // -------- space for fixed objects ---------
        this.addToMap(this.statusBar);
        this.addToMap(this.poisonBar);
        this.addToMap(this.coinBar);
        if (this.character.x > 1600) {
            this.addToMap(this.endbossBar);
        }
        this.ctx.translate(this.camera_x, 0); // Forward

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.lights);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.poisons);
        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate(-this.camera_x, 0);

        // draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
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

}