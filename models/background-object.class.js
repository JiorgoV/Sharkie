class BackgroundObject extends MovableObject {

    height = 720;
    width = 480;


    constructor(imagePath, x) {
        super();
        this.loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.width;

    }

}