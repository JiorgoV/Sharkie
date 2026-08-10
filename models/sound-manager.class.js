/** Manages game music, sound effects, volume, and muting. */
class SoundManager {
    muted = false;

    sounds = {
        startTheme: new Audio('audio/start-theme.wav'),
        backgroundFx: new Audio('audio/background-fx.wav'),
        coinPickup: new Audio('audio/coin__collectcoin.wav'),
        bubblePickup: new Audio('audio/bubble-pickup-sound.wav'),
        bubbleShot: new Audio('audio/bubble-pop.wav'),
        damageHit: new Audio('audio/damage-hit-voice-vocal.wav'),
        endbossEntry: new Audio('audio/endboss-fight.wav'),
        gameOver: new Audio('audio/dramatic-music.wav'),
    };

    /** Initializes audio loops and loads the stored volume. */
    constructor() {
        this.sounds.startTheme.loop = true;
        this.sounds.backgroundFx.loop = true;
        this.loadVolume();
    }

    /**
     * Plays a registered sound from the beginning.
     * @param {string} soundName Name of the sound in `sounds`.
     * @returns {void}
     */
    play(soundName) {
        if (!this.muted && this.sounds[soundName]) {
            this.sounds[soundName].currentTime = 0;
            this.sounds[soundName].play().catch(e => console.log('error:', e)); // ← catch wieder rein
        }
    }

    /** Mutes or unmutes all sounds. @returns {void} */
    toggleMute() {
        this.muted = !this.muted;
        if (this.muted) {
            Object.values(this.sounds).forEach(s => s.pause());
        } else {
            this.sounds.startTheme.play();
        }
        localStorage.setItem('muted', this.muted);
    }

    /** Loads the mute state from `localStorage`. @returns {void} */
    loadMuteState() {
        this.muted = localStorage.getItem('muted') === 'true';
    }

    /** Sets the global volume of all sounds.
     * @param {number} volume Volume between 0 and 1.
     * @returns {void}
     */
    setVolume(volume) {
        Object.values(this.sounds).forEach(s => s.volume = volume);
        localStorage.setItem('volume', volume);
    }

    /** Loads the global volume from `localStorage`. @returns {void} */
    loadVolume() {
        let volume = parseFloat(localStorage.getItem('volume')) || 0.5;
        this.setVolume(volume);
    }

    /**
     * Sets and stores the music volume.
     * @param {number} volume Volume between 0 and 1.
     * @returns {void}
     */
    setMusicVolume(volume) {
        this.sounds.startTheme.volume = volume;
        this.sounds.backgroundFx.volume = volume;
        localStorage.setItem('musicVolume', volume);
    }

    /**
     * Sets and stores the sound effects volume.
     * @param {number} volume Volume between 0 and 1.
     * @returns {void}
     */
    setFxVolume(volume) {
        this.sounds.coinPickup.volume = volume;
        this.sounds.bubblePickup.volume = volume;
        this.sounds.bubbleShot.volume = volume;
        this.sounds.damageHit.volume = volume;
        this.sounds.endbossEntry.volume = volume;
        this.sounds.gameOver.volume = volume;
        localStorage.setItem('fxVolume', volume);
    }
}