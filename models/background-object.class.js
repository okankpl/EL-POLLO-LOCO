class BackgroundObject extends MovableObject {

    width = 720;
    height = 400;



    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.y = 480-400;
        this.x = x;
    }
}