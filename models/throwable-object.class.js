class ThrowableObject extends MovableObject {

    constructor(x, y) {
        super();
        this.loadImage('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/4.Attack/Bubble trap/Bubble.png');
        this.x = x;
        this.y = y;
        this.height = 50;
        this.width = 50;
        this.throw();
    }

    throw () {
        this.speedY = 30;
        // this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 25);
    }

}