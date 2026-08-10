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

    constructor() {
        this.sounds.startTheme.loop = true;
        this.sounds.backgroundFx.loop = true;
        console.log('backgroundFx src:', this.sounds.backgroundFx.src);
        this.loadVolume();
    }

    play(soundName) {
        if (!this.muted && this.sounds[soundName]) {
            this.sounds[soundName].currentTime = 0;
            this.sounds[soundName].play().catch(e => console.log('error:', e)); // ← catch wieder rein
        }
    }

    toggleMute() {
        this.muted = !this.muted;
        if (this.muted) {
            Object.values(this.sounds).forEach(s => s.pause());
        } else {
            this.sounds.startTheme.play();
        }
        localStorage.setItem('muted', this.muted);
    }

    loadMuteState() {
        this.muted = localStorage.getItem('muted') === 'true';
    }

    setVolume(volume) {
        Object.values(this.sounds).forEach(s => s.volume = volume);
        localStorage.setItem('volume', volume);
    }

    loadVolume() {
        let volume = parseFloat(localStorage.getItem('volume')) || 0.5;
        this.setVolume(volume);
    }

    setMusicVolume(volume) {
        this.sounds.startTheme.volume = volume;
        this.sounds.backgroundFx.volume = volume;
        localStorage.setItem('musicVolume', volume);
    }

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