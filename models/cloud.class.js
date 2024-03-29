class Cloud extends MovableObject {
    height = 250;
    y = 20;
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 500;
        this.width = 500;
        
    }

    update() {
        this.x -= 2; // Bewege die Wolke um 2 Einheiten nach links
        if (this.x + this.width < 0) {
            this.x = 720; // Setze die Wolke zurück auf die rechte Seite des Canvas
        }
    }
}