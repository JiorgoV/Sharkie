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
    }

    play(soundName) {
        if (!this.muted && this.sounds[soundName]) {
            this.sounds[soundName].currentTime = 0;
            this.sounds[soundName].play();
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
}