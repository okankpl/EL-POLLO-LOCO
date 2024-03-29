class MovableObject {
   x = 120;
   y = 100;
   img;
   height = 350;
   width = 150;


   loadImage(path) {
      this.img = new Image();
      this.img.src = path;
   }
   
   moveRight() {
      console.log('Moving right'); 
   }

    moveLeft() {
        
    }

    update() {
      // Diese Methode kann in abgeleiteten Klassen überschrieben werden.
  }
}