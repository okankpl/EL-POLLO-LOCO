class Overlay extends DrawableObject {
    width = 720;
    height = 480;
    x = 510;
    y=0;
    LOSE = ["img/9_intro_outro_screens/game_over/game over.png"];

    
    constructor(path) {
        super().loadImage(path);
    }
}