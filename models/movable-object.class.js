class MovableObject {
    x = 120;
    y = 280;
    img;
    height = 200;
    width = 200;


    // loadImage('img/test.png');
    loadImage(path) {
        this.img = new Image(); // same as this.img = document.getElemtbyId('image') <img id='image'
        this.img.src = path;
    }

    moveRight() {
        console.log('Moving right');

    }

    moveLeft() {

    }
}