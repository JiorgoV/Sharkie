class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 20;
    y = 340;
    height = 150;
    width = 100;


    loadImage(path) {
        this.img = new Image(); // this.img = document.getElementById('image') <img id='image' src>
        this.img.src = path;
    }


    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx, x = this.x) {
        // if (this instanceof Character || this instanceof PufferFish || this instanceof Endboss || this instanceof Jellyfish) {
        //     ctx.lineWidth = '5';
        //     ctx.strokeStyle = 'blue';
        //     ctx.beginPath();
        //     ctx.rect(
        //         x + this.offset.left,
        //         this.y + this.offset.top,
        //         this.width - this.offset.left - this.offset.right,
        //         this.height - this.offset.top - this.offset.bottom
        //     );
        //     ctx.stroke();
        // }
    }

    /**
     * 
     * @param {Array} arr - ['img/image1.png', 'img/image2.png', ...]
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

}