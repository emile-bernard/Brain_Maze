function registerButtons() {
     document.getElementById("reset-btn").addEventListener("click", function () {
        resetGame();
    });

    document.getElementById("volume-up-btn").addEventListener("click", function () {
        volumeDown();
        document.getElementById("volume-off-btn").style.display = 'initial';
        document.getElementById("volume-up-btn").style.display = 'none';
    });

    document.getElementById("volume-off-btn").addEventListener("click", function () {
        volumeUp();
        document.getElementById("volume-up-btn").style.display = 'initial';
        document.getElementById("volume-off-btn").style.display = 'none';
    });
}

function resetGame() {
    location.reload(true);
}
