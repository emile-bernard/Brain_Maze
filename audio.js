function preloadBackgroundSong() {
    backgroundSong = loadSound("assets/audio/upstep.mp3");
}

function setupBackgroundSong() {
    backgroundSong.loop();
}

function volumeUp() {
    backgroundSong.setVolume(1);
}

function volumeDown() {
    backgroundSong.setVolume(0);
}
