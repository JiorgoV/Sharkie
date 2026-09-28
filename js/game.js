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
/** @type {boolean} Whether all game sounds are muted. */
let globalMuted = localStorage.getItem('muted') === 'true';
/** @type {boolean} Whether the player is navigating back to the home screen. */
let goingHome = false;

/**
 * Connects the global canvas reference to the DOM element.
 * @returns {void}
 */
function init() {
    canvas = document.getElementById('canvas');
    document.getElementById('settings-dialog').addEventListener('click', function(e) {
        if (e.target === this) closeSettings();
    });
    document.getElementById('instructions-dialog').addEventListener('click', function(e) {
        if (e.target === this) closeInstructions();
    });
    document.getElementById('pause-menu').addEventListener('click', function(e) {
        if (e.target === this) togglePause();
    });
    updateMuteButtons();
}

/**
 * Starts menu music with the stored volume settings.
 * @returns {void}
 */
function startMenuMusic() {
    if (globalMuted) return;
    let musicVolume = localStorage.getItem('musicVolume') !== null ? parseFloat(localStorage.getItem('musicVolume')) : 0.3;
    let fxVolume = localStorage.getItem('fxVolume') !== null ? parseFloat(localStorage.getItem('fxVolume')) : 0.5;
    menuMusic.volume = musicVolume;
    menuFx.volume = fxVolume;
    menuMusic.play().catch(e => {});
    menuFx.play().catch(e => {});
}

/**
 * Stops the menu music and effects playback.
 * @returns {void}
 */
function stopMenuMusic() {
    menuMusic.pause();
    menuMusic.currentTime = 0;
    menuFx.pause();
    menuFx.currentTime = 0;
}

/**
 * Stops menu music and starts a new game world.
 * @returns {void}
 */
function startGame() {
    stopMenuMusic();
    initLevel();
    showGameUI();
    initWorld();
    updateMuteButton();
}

/**
 * Shows the in-game HUD while hiding the start screen.
 * @returns {void}
 */
function showGameUI() {
    document.getElementById('start-buttons').classList.add('hidden');
    document.getElementById('game-container').classList.remove('hidden');
    document.getElementById('canvas').classList.remove('hidden');
    document.getElementById('btn-fullscreen-ingame').classList.remove('hidden');
    document.getElementById('game-container').classList.add('active');
    document.getElementById('mobile-controls').classList.add('show');
    document.getElementById('btn-pause').classList.remove('hidden');
    document.getElementById('btn-mute-ingame').classList.remove('hidden');
    document.getElementById('impressum-link').classList.add('hidden');
    document.getElementById('btn-mute-menu').classList.add('hidden');
    if (window.innerWidth >= 1090) {
        document.getElementById('panel-left').classList.remove('hidden');
        document.getElementById('panel-right').classList.remove('hidden');
    }
    updateControlsPosition();
    const isLargeTouchDevice = window.matchMedia('(pointer: coarse)').matches &&
        window.innerWidth >= 1090;
    if (isLargeTouchDevice) {
        enterFullscreen(document.getElementById('game-container'));
    }
}

/**
 * Creates the active world and applies the stored audio settings.
 * @returns {void}
 */
function initWorld() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    world.soundManager.muted = globalMuted;
    let musicVolume = localStorage.getItem('musicVolume') !== null ? parseFloat(localStorage.getItem('musicVolume')) : 0.5;
    let fxVolume = localStorage.getItem('fxVolume') !== null ? parseFloat(localStorage.getItem('fxVolume')) : 0.5;
    world.soundManager.setMusicVolume(musicVolume);
    world.soundManager.setFxVolume(fxVolume);
    world.soundManager.loadMuteState();
    world.soundManager.play('startTheme');
    world.soundManager.play('backgroundFx');
}

/**
 * Updates the mute buttons to reflect the current game audio state.
 * @returns {void}
 */
function updateMuteButton() {
    let btn = document.getElementById('mute-btn');
    let btnIngame = document.getElementById('btn-mute-ingame');
    if (btn) btn.textContent = world.soundManager.muted ? '🔇 Off' : '🔊 On';
    if (btnIngame) btnIngame.textContent = world.soundManager.muted ? '🔇' : '🔊';
}

/**
 * Resets the current run and recreates the level from a clean state.
 * @returns {void}
 */
function restartGame() {
    stopPreviousGame();
    initLevel();
    resetGameScreens();
    initWorld();
}

/**
 * Stops the currently running world and resets the relevant victory and failure sounds.
 * @returns {void}
 */
function stopPreviousGame() {
    if (!world) return;
    world.stopGame();
    world.soundManager.sounds.endbossDead.pause();
    world.soundManager.sounds.endbossDead.currentTime = 0;
    world.soundManager.sounds.gameOver.pause();
    world.soundManager.sounds.gameOver.currentTime = 0;
    world.soundManager.sounds.endbossEntry.pause();
    world.soundManager.sounds.endbossEntry.currentTime = 0;
}

/**
 * Hides result overlays and restores the canvas visibility for a new game start.
 * @returns {void}
 */
function resetGameScreens() {
    document.getElementById('gameover-screen').classList.add('hidden');
    document.getElementById('youwin-screen').classList.add('hidden');
    document.getElementById('canvas').classList.remove('hidden');
    document.getElementById('mobile-controls').classList.add('show');
}

/**
 * Ends the current round and displays the main menu.
 * @returns {void}
 */
function goHome() {
    stopGameSounds();
    goingHome = true;
    if (document.fullscreenElement) document.exitFullscreen();
    hideGameUI();
    showHomeUI();
    startMenuMusic();
}

/**
 * Stops game playback and clears the endboss/game-over sound state.
 * @returns {void}
 */
function stopGameSounds() {
    if (!world) return;
    world.stopGame();
    world.soundManager.sounds.snore.pause();
    world.soundManager.sounds.snore.currentTime = 0;
    world.soundManager.sounds.endbossDead.pause();
    world.soundManager.sounds.endbossDead.currentTime = 0;
    world.soundManager.sounds.gameOver.pause();
    world.soundManager.sounds.gameOver.currentTime = 0;
    world.soundManager.sounds.endbossEntry.pause();
    world.soundManager.sounds.endbossEntry.currentTime = 0;
    world.soundManager.sounds.endbossAttack.pause();
    world.soundManager.sounds.endbossAttack.currentTime = 0;
}

/**
 * Hides the splash screen and displays the main menu.
 * @returns {void}
 */
function showMainMenu() {
    document.getElementById('splash-screen').classList.add('hidden');
    if (window.innerWidth > 760) {
        document.getElementById('main-title').classList.remove('hidden');
    }
    document.getElementById('start-buttons').classList.remove('hidden');
    startMenuMusic();
}