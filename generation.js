function drawGenerationCount() {
    fill(255);
    noStroke();
    textSize(72);
    textAlign(CENTER, CENTER);

    text('Gen#: ' + generationCount, width/2, height/2);
}

function nextGen() {
    generationCount += 1;
    resetZombies();
}

function resetZombies() {
    for (let i = 0; i < zombies.length; i++) {
        zombies[i].remove();
    }

    createZombies();
}