class Chicken extends MovableObject {


    

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.y = 300;
        this.x = 200 + Math.random() * 500;
        this.width = 100;
        this.height = 150;
    }
    
}