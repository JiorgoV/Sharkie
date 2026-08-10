/**
 * Base class for all visible game objects.
 * Manages the current image, image cache, and drawing dimensions.
 */
class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 20;
    y = 340;
    height = 150;
    width = 100;


    /**
     * Loads a single image and sets it as the current image.
     * @param {string} path Path to the image file.
     * @returns {void}
     */
    loadImage(path) {
        this.img = new Image(); // this.img = document.getElementById('image') <img id='image' src>
        this.img.src = path;
    }


    /**
     * Draws the current image at the object's position on the canvas.
     * @param {CanvasRenderingContext2D} ctx Canvas rendering context.
     * @returns {void}
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Optionally draws the object's collision frame.
     * The frame is currently disabled and serves as a debugging extension.
     * @param {CanvasRenderingContext2D} ctx Canvas rendering context.
     * @param {number} [x=this.x] Optional x-position for the frame.
     * @returns {void}
     */
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
     * Loads multiple images into the object's cache.
     * @param {string[]} arr Image paths in animation order.
     * @returns {void}
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

}