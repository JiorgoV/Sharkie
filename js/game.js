let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
}

function startGame() {
    initLevel();
    document.getElementById('start-buttons').classList.add('hidden');
    document.getElementById('canvas').classList.remove('hidden');
    document.getElementById('btn-fullscreen-ingame').classList.remove('hidden');
    document.getElementById('game-container').classList.add('active');
    world = new World(canvas, keyboard);
}

function restartGame() {
    if (world) world.stopGame();
    initLevel();
    document.getElementById('gameover-screen').classList.add('hidden');
    document.getElementById('youwin-screen').classList.add('hidden');
    document.getElementById('canvas').classList.remove('hidden');
    world = new World(canvas, keyboard);
}

function goHome() {
    if (world) world.stopGame();
    document.getElementById('canvas').classList.add('hidden');
    document.getElementById('btn-fullscreen-ingame').classList.add('hidden');
    document.getElementById('gameover-screen').classList.add('hidden');
    document.getElementById('youwin-screen').classList.add('hidden');
    document.getElementById('start-buttons').classList.remove('hidden');
    document.getElementById('game-container').classList.remove('active');
}

function openInstructions() {
    document.getElementById('instructions-dialog').classList.remove('hidden');
}

function closeInstructions() {
    document.getElementById('instructions-dialog').classList.add('hidden');
}

function toggleFullscreen() {
    let container = document.getElementById('game-container');
    if (!document.fullscreenElement) {
        container.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

window.addEventListener('keydown', (e) => {
    if (e.keyCode == 39) keyboard.RIGHT = true;
    if (e.keyCode == 37) keyboard.LEFT = true;
    if (e.keyCode == 38) keyboard.UP = true;
    if (e.keyCode == 40) keyboard.DOWN = true;
    if (e.keyCode == 32) keyboard.SPACE = true;
    if (e.keyCode == 68) keyboard.D = true;
});

window.addEventListener('keyup', (e) => {
    if (e.keyCode == 39) keyboard.RIGHT = false;
    if (e.keyCode == 37) keyboard.LEFT = false;
    if (e.keyCode == 38) keyboard.UP = false;
    if (e.keyCode == 40) keyboard.DOWN = false;
    if (e.keyCode == 32) keyboard.SPACE = false;
    if (e.keyCode == 68) keyboard.D = false;
});

function openSettings() {
    document.getElementById('settings-dialog').classList.remove('hidden');
}

function closeSettings() {
    document.getElementById('settings-dialog').classList.add('hidden');
}

function toggleMute() {

}