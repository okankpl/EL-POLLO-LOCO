let canvas;
let ctx;
let world;

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas);
    console.log('My Character is,', world.character);
}

window.addEventListener('keydown', (e) => {
    console.log(e);
});