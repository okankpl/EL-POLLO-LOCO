class World {

    character = new Character();
    enemies = [
    new Chicken(),
    new Chicken(),
    new Chicken(),];
    
    clouds = [
        new Cloud()
    ]
    backgroundObject = [
        new BackgroundObject('img/5_background/layers/air.png',0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png',0),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png',0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0,480 ),
        
    ];
    canvas;
    ctx;
    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
        

    }

    draw(){
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height); // Clears the canvas
        this.addObjectsToMap(this.backgroundObject);
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);
        this.clouds.forEach(cloud => {
            cloud.update();
            this.addToMap(cloud); 
        });
        

        //draw wird immer wieder aufgerufen
        let self = this
        requestAnimationFrame(function() {
            self.draw(); //innerhalb der Funktion ist this nicht gültig
        });
    };

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }

    addToMap(mo) {
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    }
}
