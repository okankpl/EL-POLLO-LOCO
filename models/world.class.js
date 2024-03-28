class World {

    character = new Character();
    enemies = [
    new Chicken(),
    new Chicken(),
    new Chicken(),];
  
    clouds = [
        new Cloud()
    ]
    canvas;
    ctx;
    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
        

    }


    draw(){

        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height); // Clears the canvas

        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height);
        
        this.enemies.forEach(enemy => {
            this.ctx.drawImage(enemy.img, enemy.x, enemy.y, enemy.width, enemy.height);
        });
        
        this.clouds.forEach(clouds => {
            this.ctx.drawImage(clouds.img, clouds.x, clouds.y, clouds.width, clouds.height);
        });


        //draw wird immer wieder aufgerufen
        let self = this
        requestAnimationFrame(function() {
            self.draw(); //innerhalb der Funktion ist this nicht gültig
        });
    };
}