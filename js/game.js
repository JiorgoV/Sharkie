/** @type {HTMLCanvasElement} Canvas used for the game view. */
let canvas;
/** @type {World} Current game world. */
let world;
/** @type {Keyboard} Global keyboard state. */
let keyboard = new Keyboard();
/** @type {HTMLAudioElement} Main menu music. */
let menuMusic = new Audio('audio/start-theme.wav');
menuMusic.loop = true;
/** @type {HTMLAudioElement} Main menu background effects. */
let menuFx = new Audio('audio/background-fx.wav');
menuFx.loop = true;

/** Connects the global canvas reference to the DOM element. @returns {void} */
function init() {
    canvas = document.getElementById('canvas');
}

/** Starts menu music with the stored volume settings. @returns {void} */
function startMenuMusic() {
    let musicVolume = localStorage.getItem('musicVolume') !== null ? parseFloat(localStorage.getItem('musicVolume')) : 0.5;
    let fxVolume = localStorage.getItem('fxVolume') !== null ? parseFloat(localStorage.getItem('fxVolume')) : 0.5;
    menuMusic.volume = musicVolume;
    menuFx.volume = fxVolume;
    menuMusic.play().catch(e => {});
    menuFx.play().catch(e => {});
}

/** Stops menu music and starts a new game world. @returns {void} */
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
    document.getElementById('btn-mute-ingame').classList.remove('hidden');
}

/** Resets the current level and restarts the game. @returns {void} */
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

/** Ends the current round and displays the main menu. @returns {void} */
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
    document.getElementById('btn-mute-ingame').classList.add('hidden');
    startMenuMusic();
}

/** Opens the settings dialog and applies the stored volume settings. @returns {void} */
function openSettings() {
    startMenuMusic();
    document.getElementById('settings-dialog').classList.remove('hidden');
    document.getElementById('pause-menu').classList.add('hidden');
    let musicVolume = localStorage.getItem('musicVolume') !== null ? parseFloat(localStorage.getItem('musicVolume')) : 0.5;
    let fxVolume = localStorage.getItem('fxVolume') !== null ? parseFloat(localStorage.getItem('fxVolume')) : 0.5;
    document.getElementById('music-slider').value = musicVolume;
    document.getElementById('fx-slider').value = fxVolume;
}

/** Closes the settings dialog and returns to the pause menu when applicable. @returns {void} */
function closeSettings() {
    document.getElementById('settings-dialog').classList.add('hidden');
    if (world && world.paused) {
        document.getElementById('pause-menu').classList.remove('hidden');
    }
}

/** Opens the instructions dialog. @returns {void} */
function openInstructions() {
    startMenuMusic();
    document.getElementById('instructions-dialog').classList.remove('hidden');
}

/** Closes the instructions dialog. @returns {void} */
function closeInstructions() {
    document.getElementById('instructions-dialog').classList.add('hidden');
}

/** Toggles fullscreen mode for the game container. @returns {void} */
function toggleFullscreen() {
    let container = document.getElementById('game-container');
    if (!document.fullscreenElement) {
        container.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

/** Toggles between paused and running game states. @returns {void} */
function togglePause() {
    let pauseMenu = document.getElementById('pause-menu');
    pauseMenu.classList.toggle('hidden');
    world.paused = !world.paused;
}

/** Mutes or unmutes the sound of the current game world. @returns {void} */
function toggleMute() {
    world.soundManager.toggleMute();
    let btn = document.getElementById('mute-btn');
    let btnIngame = document.getElementById('btn-mute-ingame');
    if (btn) btn.textContent = world.soundManager.muted ? '🔇 Off' : '🔊 On';
    if (btnIngame) btnIngame.textContent = world.soundManager.muted ? '🔇' : '🔊';
}

/**
 * Updates the music volume of the menu and game world.
 * @param {string|number} value New volume between 0 and 1.
 * @returns {void}
 */
function changeMusicVolume(value) {
    menuMusic.volume = parseFloat(value);
    localStorage.setItem('musicVolume', value);
    if (world) world.soundManager.setMusicVolume(parseFloat(value));
}

/**
 * Updates the effects volume of the menu and game world.
 * @param {string|number} value New volume between 0 and 1.
 * @returns {void}
 */
function changeFxVolume(value) {
    menuFx.volume = parseFloat(value);
    localStorage.setItem('fxVolume', value);
    if (world) world.soundManager.setFxVolume(parseFloat(value));
}

/** Hides the splash screen and displays the main menu. @returns {void} */
function showMainMenu() {
    document.getElementById('splash-screen').classList.add('hidden');
    document.querySelector('h1').classList.remove('hidden');
    document.getElementById('start-buttons').classList.remove('hidden');
    document.getElementById('main-title').classList.remove('hidden');
    startMenuMusic();
}

/** Updates the keyboard state when game keys are pressed. */
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

/** Updates the keyboard state when game keys are released. */
window.addEventListener('keyup', (e) => {
    if (e.keyCode == 39) keyboard.RIGHT = false;
    if (e.keyCode == 37) keyboard.LEFT = false;
    if (e.keyCode == 38) keyboard.UP = false;
    if (e.keyCode == 40) keyboard.DOWN = false;
    if (e.keyCode == 32) keyboard.SPACE = false;
    if (e.keyCode == 68) keyboard.D = false;
});