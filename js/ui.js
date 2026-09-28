/**
 * Hides the active game UI and returns to the menu state.
 * @returns {void}
 */
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

/**
 * Displays the main menu overlay and adapts the title visibility.
 * @returns {void}
 */
function showHomeUI() {
    document.getElementById('start-buttons').classList.remove('hidden');
    if (window.innerWidth > 760) {
        document.getElementById('main-title').classList.remove('hidden');
    } else {
        document.getElementById('main-title').classList.add('hidden');
    }
}

/**
 * Opens the settings dialog and applies the stored volume settings.
 * @returns {void}
 */
function openSettings() {
    if (!world && !globalMuted) startMenuMusic();
    const gc = document.getElementById('game-container');
    if (gc.classList.contains('hidden')) gc.classList.remove('hidden');
    document.getElementById('settings-dialog').classList.remove('hidden');
    document.getElementById('pause-menu').classList.add('hidden');
    document.getElementById('mobile-controls').style.pointerEvents = 'none';
    let musicVolume = localStorage.getItem('musicVolume') !== null ? parseFloat(localStorage.getItem('musicVolume')) : 0.5;
    let fxVolume = localStorage.getItem('fxVolume') !== null ? parseFloat(localStorage.getItem('fxVolume')) : 0.5;
    document.getElementById('music-slider').value = musicVolume;
    document.getElementById('fx-slider').value = fxVolume;
}

/**
 * Closes the settings dialog and restores the previous UI state.
 * @returns {void}
 */
function closeSettings() {
    document.getElementById('settings-dialog').classList.add('hidden');
    document.getElementById('mobile-controls').style.pointerEvents = 'all';
    if (!world) document.getElementById('game-container').classList.add('hidden');
    if (world && world.paused) {
        document.getElementById('pause-menu').classList.remove('hidden');
    }
}

/**
 * Opens the instructions dialog.
 * @returns {void}
 */
function openInstructions() {
    startMenuMusic();
    document.getElementById('instructions-dialog').classList.remove('hidden');
}

/**
 * Closes the instructions dialog.
 * @returns {void}
 */
function closeInstructions() {
    document.getElementById('instructions-dialog').classList.add('hidden');
}

/**
 * Shows a specific settings tab and activates its button.
 * @param {string} tab - Name of the tab to display.
 * @returns {void}
 */
function showTab(tab) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.add('hidden'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('tab-' + tab).classList.remove('hidden');
    event.target.classList.add('active');
}

/**
 * Updates all mute button labels to reflect the current mute state.
 * @returns {void}
 */
function updateMuteButtons() {
    let btn = document.getElementById('mute-btn');
    let btnIngame = document.getElementById('btn-mute-ingame');
    let btnMenu = document.getElementById('btn-mute-menu');
    if (btn) btn.textContent = globalMuted ? '🔇 Off' : '🔊 On';
    if (btnIngame) btnIngame.textContent = globalMuted ? '🔇' : '🔊';
    if (btnMenu) btnMenu.textContent = globalMuted ? '🔇' : '🔊';
}