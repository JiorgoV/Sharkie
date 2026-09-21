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

let globalMuted = localStorage.getItem('muted') === 'true';

/** Connects the global canvas reference to the DOM element. @returns {void} */
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

/** Starts menu music with the stored volume settings. @returns {void} */
function startMenuMusic() {
    if (globalMuted) return;
    let musicVolume = localStorage.getItem('musicVolume') !== null ? parseFloat(localStorage.getItem('musicVolume')) : 0.3;
    let fxVolume = localStorage.getItem('fxVolume') !== null ? parseFloat(localStorage.getItem('fxVolume')) : 0.5;
    menuMusic.volume = musicVolume;
    menuFx.volume = fxVolume;
    menuMusic.play().catch(e => {});
    menuFx.play().catch(e => {});
}

/** Stops menu music and starts a new game world. @returns {void} */
function startGame() {
    stopMenuMusic();
    initLevel();
    showGameUI();
    initWorld();
    updateMuteButton();
}

/** Stops the menu music and effects playback. @returns {void} */
function stopMenuMusic() {
    menuMusic.pause();
    menuMusic.currentTime = 0;
    menuFx.pause();
    menuFx.currentTime = 0;
}

/** Shows the in-game HUD while hiding the start screen. @returns {void} */
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
    if (isFullscreenTouchActive()) {
        enterFullscreen(document.getElementById('game-container'));
    }
}

/** Creates the active world and applies the stored audio settings. @returns {void} */
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

/** Updates the mute buttons to reflect the current game audio state. @returns {void} */
function updateMuteButton() {
    let btn = document.getElementById('mute-btn');
    let btnIngame = document.getElementById('btn-mute-ingame');
    if (btn) btn.textContent = world.soundManager.muted ? '🔇 Off' : '🔊 On';
    if (btnIngame) btnIngame.textContent = world.soundManager.muted ? '🔇' : '🔊';
}

/** Resets the current run and recreates the level from a clean state. @returns {void} */
function restartGame() {
    stopPreviousGame();
    initLevel();
    resetGameScreens();
    initWorld();
}

/** Stops the currently running world and resets the relevant victory and failure sounds. @returns {void} */
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

/** Hides result overlays and restores the canvas visibility for a new game start. @returns {void} */
function resetGameScreens() {
    document.getElementById('gameover-screen').classList.add('hidden');
    document.getElementById('youwin-screen').classList.add('hidden');
    document.getElementById('canvas').classList.remove('hidden');
}

/** Ends the current round and displays the main menu. @returns {void} */
function goHome() {
    stopGameSounds();
    goingHome = true;
    if (document.fullscreenElement) document.exitFullscreen();
    hideGameUI();
    showHomeUI();
    startMenuMusic();
}

/** Stops game playback and clears the endboss/game-over sound state. @returns {void} */
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

/** Hides the active game UI and returns to the menu state. @returns {void} */
function hideGameUI() {
    document.getElementById('canvas').classList.add('hidden');
    document.getElementById('btn-fullscreen-ingame').classList.add('hidden');
    document.getElementById('btn-pause').classList.add('hidden');
    document.getElementById('pause-menu').classList.add('hidden');
    document.getElementById('mobile-controls').classList.remove('show');
    document.getElementById('gameover-screen').classList.add('hidden');
    document.getElementById('youwin-screen').classList.add('hidden');
    document.getElementById('game-container').classList.remove('active');
    document.getElementById('game-container').classList.add('hidden');
    document.getElementById('btn-mute-ingame').classList.add('hidden');
    document.getElementById('impressum-link').classList.remove('hidden');
    document.getElementById('panel-left').classList.add('hidden');
    document.getElementById('panel-right').classList.add('hidden');
    document.getElementById('btn-mute-menu').classList.remove('hidden');
}

/** Displays the main menu overlay and adapts the title visibility. @returns {void} */
function showHomeUI() {
    document.getElementById('start-buttons').classList.remove('hidden');
    if (window.innerWidth > 760) {
        document.getElementById('main-title').classList.remove('hidden');
    } else {
        document.getElementById('main-title').classList.add('hidden');
    }
}

/** Opens the settings dialog and applies the stored volume settings. @returns {void} */
function openSettings() {
    if (!world && !globalMuted) startMenuMusic();
    document.getElementById('settings-dialog').classList.remove('hidden');
    document.getElementById('pause-menu').classList.add('hidden');
    document.getElementById('mobile-controls').style.pointerEvents = 'none'; // ← neu
    let musicVolume = localStorage.getItem('musicVolume') !== null ? parseFloat(localStorage.getItem('musicVolume')) : 0.5;
    let fxVolume = localStorage.getItem('fxVolume') !== null ? parseFloat(localStorage.getItem('fxVolume')) : 0.5;
    document.getElementById('music-slider').value = musicVolume;
    document.getElementById('fx-slider').value = fxVolume;
}

/** Closes the settings dialog and returns to the pause menu when applicable. @returns {void} */
function closeSettings() {
    document.getElementById('settings-dialog').classList.add('hidden');
    document.getElementById('mobile-controls').style.pointerEvents = 'all'; // ← neu
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

/** Requests browser fullscreen mode for a DOM element. @param {HTMLElement} element Element to display in fullscreen. @returns {void} */
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
    if (screen.orientation && screen.orientation.lock) {
        screen.orientation.lock('landscape').catch(e => {});
    }
}

/** Exits the browser fullscreen mode if it is active. @returns {void} */
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}


/** Toggles fullscreen mode for the game container. @returns {void} */
function toggleFullscreen() {
    let container = document.getElementById('game-container');
    if (!document.fullscreenElement) {
        enterFullscreen(container);
    } else {
        exitFullscreen();
    }
}

/** Toggles the pause state and switches the active game audio accordingly. @returns {void} */
function togglePause() {
    let pauseMenu = document.getElementById('pause-menu');
    pauseMenu.classList.toggle('hidden');
    world.paused = !world.paused;
    world.paused ? pauseGameSounds() : resumeGameSounds();
}

/** Pauses music and ambiance while the game is paused. @returns {void} */
function pauseGameSounds() {
    world.soundManager.sounds.startTheme.pause();
    world.soundManager.sounds.backgroundFx.pause();
    world.soundManager.sounds.endbossEntry.pause();
    world.soundManager.sounds.swimming.pause();
    world.soundManager.sounds.swimming.currentTime = 0;
}

/** Resumes the correct background track when gameplay continues. @returns {void} */
function resumeGameSounds() {
    if (world.soundManager.muted) return;
    let endboss = world.level.enemies.find(e => e instanceof Endboss);
    if (endboss && endboss.hadFirstContact) {
        world.soundManager.sounds.endbossEntry.play();
    } else {
        world.soundManager.sounds.startTheme.play();
        world.soundManager.sounds.backgroundFx.play();
    }
}

/** Mutes or unmutes the sound of the current game world. @returns {void} */
function toggleMute() {
    globalMuted = !globalMuted;
    localStorage.setItem('muted', globalMuted);
    if (globalMuted) {
        menuMusic.pause();
        menuFx.pause();
        if (world) world.soundManager.muted = true;
        if (world) Object.values(world.soundManager.sounds).forEach(s => s.pause());
    } else {
        menuMusic.play().catch(e => {});
        menuFx.play().catch(e => {});
        if (world) world.soundManager.muted = false;
    }
    updateMuteButtons();
}

function updateMuteButtons() {
    let btn = document.getElementById('mute-btn');
    let btnIngame = document.getElementById('btn-mute-ingame');
    let btnMenu = document.getElementById('btn-mute-menu');
    if (btn) btn.textContent = globalMuted ? '🔇 Off' : '🔊 On';
    if (btnIngame) btnIngame.textContent = globalMuted ? '🔇' : '🔊';
    if (btnMenu) btnMenu.textContent = globalMuted ? '🔇' : '🔊';
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
    if (window.innerWidth > 760) {
        document.getElementById('main-title').classList.remove('hidden');
    }
    document.getElementById('start-buttons').classList.remove('hidden');
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



/** Checks whether the fullscreen touch layout is currently active. @returns {boolean} */
function isFullscreenTouchActive() {
    return window.innerWidth < 1090;
}

/** Clears all inline positioning styles from the mobile controls element.
 * @param {HTMLElement} controls
 * @returns {void} */
function clearControlsPosition(controls) {
    controls.style.width = controls.style.left = controls.style.bottom = controls.style.transform = '';
}

/** Calculates the rendered canvas position and size based on viewport and aspect ratio.
 * @param {HTMLCanvasElement} canvas
 * @returns {{ left: number, top: number, width: number }} */
function getRenderedCanvasRect(canvas) {
    const scale = Math.min(window.innerWidth / (canvas.width || 720), window.innerHeight / (canvas.height || 480));
    const width = (canvas.width || 720) * scale;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - (canvas.height || 480) * scale) / 2;
    return { left, top, width };
}

/** Positions the mobile controls overlay to match the canvas bounds. @returns {void} */
function updateControlsPosition() {
    const canvas = document.getElementById('canvas');
    const controls = document.getElementById('mobile-controls');
    if (!canvas || !controls || canvas.classList.contains('hidden')) return;
    if (!isFullscreenTouchActive()) { clearControlsPosition(controls); return; }
    const { left, top, width } = getRenderedCanvasRect(canvas);
    controls.style.width = width + 'px';
    controls.style.left = left + 'px';
    controls.style.bottom = (top + 10) + 'px';
    controls.style.transform = 'none';
}

/** Shows a specific settings tab and activates its button. @param {string} tab Name of the tab to display. @returns {void} */
function showTab(tab) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.add('hidden'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('tab-' + tab).classList.remove('hidden');
    event.target.classList.add('active');
}

window.addEventListener('resize', () => {
    updateControlsPosition();
    if (!world) return;
    if (window.innerWidth >= 1090) {
        document.getElementById('panel-left').classList.remove('hidden');
        document.getElementById('panel-right').classList.remove('hidden');
    } else {
        document.getElementById('panel-left').classList.add('hidden');
        document.getElementById('panel-right').classList.add('hidden');
    }
});

/** Re-enters fullscreen on mobile if it was exited unintentionally (e.g. via ESC). @returns {void} */
document.addEventListener('fullscreenchange', () => {
    if (document.fullscreenElement) return;
    if (goingHome) { goingHome = false; return; }
    if (!isFullscreenTouchActive() || !world || world.paused) return;
    togglePause();
    enterFullscreen(document.getElementById('game-container'));
});

window.addEventListener('orientationchange', () => setTimeout(() => {
    updateControlsPosition();
}, 100));