let canvas;
let world;
let keyboard = new Keyboard();
let menuMusic = new Audio('audio/start-theme.wav');
menuMusic.loop = true;
let menuFx = new Audio('audio/background-fx.wav');
menuFx.loop = true;

function init() {
    canvas = document.getElementById('canvas');
}

function startMenuMusic() {
    let musicVolume = localStorage.getItem('musicVolume') !== null ? parseFloat(localStorage.getItem('musicVolume')) : 0.5;
    let fxVolume = localStorage.getItem('fxVolume') !== null ? parseFloat(localStorage.getItem('fxVolume')) : 0.5;
    menuMusic.volume = musicVolume;
    menuFx.volume = fxVolume;
    menuMusic.play().catch(e => {});
    menuFx.play().catch(e => {});
}

function startGame() {
    menuMusic.pause();
    menuMusic.currentTime = 0;
    menuFx.pause();
    menuFx.currentTime = 0;
    initLevel();
    document.getElementById('start-buttons').classList.add('hidden');
    document.getElementById('game-container').classList.remove('hidden');
    document.getElementById('canvas').classList.remove('hidden');
    document.getElementById('btn-fullscreen-ingame').classList.remove('hidden');
    document.getElementById('game-container').classList.add('active');
    document.getElementById('mobile-controls').classList.add('show');
    document.getElementById('btn-pause').classList.remove('hidden');
    world = new World(canvas, keyboard);
    let musicVolume = localStorage.getItem('musicVolume') !== null ? parseFloat(localStorage.getItem('musicVolume')) : 0.5;
    let fxVolume = localStorage.getItem('fxVolume') !== null ? parseFloat(localStorage.getItem('fxVolume')) : 0.5;
    world.soundManager.setMusicVolume(musicVolume);
    world.soundManager.setFxVolume(fxVolume);
    world.soundManager.loadMuteState();
    world.soundManager.play('startTheme');
    world.soundManager.play('backgroundFx');
    let btn = document.getElementById('mute-btn');
    if (btn) btn.textContent = world.soundManager.muted ? '🔇 Off' : '🔊 On';
}

function restartGame() {
    if (world) world.stopGame();
    initLevel();
    document.getElementById('gameover-screen').classList.add('hidden');
    document.getElementById('youwin-screen').classList.add('hidden');
    document.getElementById('canvas').classList.remove('hidden');
    world = new World(canvas, keyboard);
    let musicVolume = localStorage.getItem('musicVolume') !== null ? parseFloat(localStorage.getItem('musicVolume')) : 0.5;
    let fxVolume = localStorage.getItem('fxVolume') !== null ? parseFloat(localStorage.getItem('fxVolume')) : 0.5;
    world.soundManager.setMusicVolume(musicVolume);
    world.soundManager.setFxVolume(fxVolume);
    world.soundManager.loadMuteState();
    world.soundManager.play('startTheme');
    world.soundManager.play('backgroundFx');
}

function goHome() {
    if (world) world.stopGame();
    document.getElementById('canvas').classList.add('hidden');
    document.getElementById('btn-fullscreen-ingame').classList.add('hidden');
    document.getElementById('btn-pause').classList.add('hidden');
    document.getElementById('pause-menu').classList.add('hidden');
    document.getElementById('mobile-controls').classList.remove('show');
    document.getElementById('gameover-screen').classList.add('hidden');
    document.getElementById('youwin-screen').classList.add('hidden');
    document.getElementById('game-container').classList.remove('active');
    document.getElementById('game-container').classList.add('hidden');
    document.getElementById('start-buttons').classList.remove('hidden');
    document.querySelector('h1').classList.remove('hidden');
    document.getElementById('main-title').classList.remove('hidden');
    startMenuMusic();
}

function openSettings() {
    startMenuMusic();
    document.getElementById('settings-dialog').classList.remove('hidden');
    document.getElementById('pause-menu').classList.add('hidden');
    let musicVolume = localStorage.getItem('musicVolume') !== null ? parseFloat(localStorage.getItem('musicVolume')) : 0.5;
    let fxVolume = localStorage.getItem('fxVolume') !== null ? parseFloat(localStorage.getItem('fxVolume')) : 0.5;
    document.getElementById('music-slider').value = musicVolume;
    document.getElementById('fx-slider').value = fxVolume;
}

function closeSettings() {
    document.getElementById('settings-dialog').classList.add('hidden');
    if (world && world.paused) {
        document.getElementById('pause-menu').classList.remove('hidden');
    }
}

function openInstructions() {
    startMenuMusic();
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

function togglePause() {
    let pauseMenu = document.getElementById('pause-menu');
    pauseMenu.classList.toggle('hidden');
    world.paused = !world.paused;
}

function toggleMute() {
    world.soundManager.toggleMute();
    let btn = document.getElementById('mute-btn');
    if (btn) btn.textContent = world.soundManager.muted ? '🔇 Off' : '🔊 On';
}

function changeMusicVolume(value) {
    menuMusic.volume = parseFloat(value);
    localStorage.setItem('musicVolume', value);
    if (world) world.soundManager.setMusicVolume(parseFloat(value));
}

function changeFxVolume(value) {
    menuFx.volume = parseFloat(value);
    localStorage.setItem('fxVolume', value);
    if (world) world.soundManager.setFxVolume(parseFloat(value));
}

function showMainMenu() {
    document.getElementById('splash-screen').classList.add('hidden');
    document.querySelector('h1').classList.remove('hidden');
    document.getElementById('start-buttons').classList.remove('hidden');
    document.getElementById('main-title').classList.remove('hidden');
    startMenuMusic();
}

window.addEventListener('keydown', (e) => {
    if (e.keyCode == 39) keyboard.RIGHT = true;
    if (e.keyCode == 37) keyboard.LEFT = true;
    if (e.keyCode == 38) keyboard.UP = true;
    if (e.keyCode == 40) keyboard.DOWN = true;
    if (e.keyCode == 32) keyboard.SPACE = true;
    if (e.keyCode == 68) keyboard.D = true;
    if (e.keyCode == 27) {
        if (world) togglePause();
    }
});

window.addEventListener('keyup', (e) => {
    if (e.keyCode == 39) keyboard.RIGHT = false;
    if (e.keyCode == 37) keyboard.LEFT = false;
    if (e.keyCode == 38) keyboard.UP = false;
    if (e.keyCode == 40) keyboard.DOWN = false;
    if (e.keyCode == 32) keyboard.SPACE = false;
    if (e.keyCode == 68) keyboard.D = false;
});