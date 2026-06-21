class Light extends MovableObject {
    width = 480;
    height = 360;
    y = 0;
    x = 0;
    startX;
    angle = 0;

    constructor(imagePath, x) {
        super();
        this.loadImage(imagePath);
        this.startX = x;
        this.x = x;
        this.y = this.y;
        this.animate();

    }

    animate() {
        setInterval(() => {
            this.angle += 0.05;
            this.x = this.startX + Math.sin(this.angle) * 20;
        }, 100);
    }
}