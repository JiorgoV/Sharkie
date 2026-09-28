/**
 * Requests browser fullscreen mode for a DOM element.
 * @param {HTMLElement} element - Element to display in fullscreen.
 * @returns {void}
 */
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

/**
 * Exits the browser fullscreen mode if it is active.
 * @returns {void}
 */
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

/**
 * Toggles fullscreen mode for the game container.
 * @returns {void}
 */
function toggleFullscreen() {
    let container = document.getElementById('game-container');
    if (!document.fullscreenElement) {
        enterFullscreen(container);
    } else {
        exitFullscreen();
    }
}

/**
 * Toggles the pause state and switches the active game audio accordingly.
 * @returns {void}
 */
function togglePause() {
    let pauseMenu = document.getElementById('pause-menu');
    pauseMenu.classList.toggle('hidden');
    world.paused = !world.paused;
    world.paused ? pauseGameSounds() : resumeGameSounds();
}

/**
 * Pauses music and ambiance while the game is paused.
 * @returns {void}
 */
function pauseGameSounds() {
    world.soundManager.sounds.startTheme.pause();
    world.soundManager.sounds.backgroundFx.pause();
    world.soundManager.sounds.endbossEntry.pause();
    world.soundManager.sounds.swimming.pause();
    world.soundManager.sounds.swimming.currentTime = 0;
}

/**
 * Resumes the correct background track when gameplay continues.
 * @returns {void}
 */
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

/**
 * Resumes game from pause menu and re-enters fullscreen on touch devices.
 * @returns {void}
 */
function resumeGame() {
    togglePause();
    const isLargeTouchDevice = window.matchMedia('(pointer: coarse)').matches &&
        window.innerWidth >= 1090;
    if (isLargeTouchDevice && !document.fullscreenElement) {
        enterFullscreen(document.getElementById('game-container'));
    }
}

/**
 * Mutes or unmutes the sound of the current game world.
 * @returns {void}
 */
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

/**
 * Updates the music volume of the menu and game world.
 * @param {string|number} value - New volume between 0 and 1.
 * @returns {void}
 */
function changeMusicVolume(value) {
    menuMusic.volume = parseFloat(value);
    localStorage.setItem('musicVolume', value);
    if (world) world.soundManager.setMusicVolume(parseFloat(value));
}

/**
 * Updates the effects volume of the menu and game world.
 * @param {string|number} value - New volume between 0 and 1.
 * @returns {void}
 */
function changeFxVolume(value) {
    menuFx.volume = parseFloat(value);
    localStorage.setItem('fxVolume', value);
    if (world) world.soundManager.setFxVolume(parseFloat(value));
}

/**
 * Checks whether the fullscreen touch layout is currently active.
 * @returns {boolean}
 */
function isFullscreenTouchActive() {
    return window.innerWidth < 1090;
}

/**
 * Clears all inline positioning styles from the mobile controls element.
 * @param {HTMLElement} controls - The mobile controls DOM element.
 * @returns {void}
 */
function clearControlsPosition(controls) {
    controls.style.width = controls.style.left = controls.style.bottom = controls.style.transform = '';
}

/**
 * Calculates the rendered canvas position and size based on viewport and aspect ratio.
 * @param {HTMLCanvasElement} canvas - The game canvas element.
 * @returns {{ left: number, top: number, width: number }}
 */
function getRenderedCanvasRect(canvas) {
    const scale = Math.min(window.innerWidth / (canvas.width || 720), window.innerHeight / (canvas.height || 480));
    const width = (canvas.width || 720) * scale;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - (canvas.height || 480) * scale) / 2;
    return { left, top, width };
}

/**
 * Positions the mobile controls overlay to match the canvas bounds.
 * @returns {void}
 */
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

document.addEventListener('fullscreenchange', () => {
    if (document.fullscreenElement) return;
    if (goingHome) { goingHome = false; return; }
    if (!isFullscreenTouchActive() || !world || world.paused) return;
    togglePause();
});

window.addEventListener('orientationchange', () => setTimeout(() => {
    updateControlsPosition();
}, 100));