function preloadZombieImg() {
    let zombieImg = loadImage('assets/image/resized_zombie.png');

    for(let i = 0; i < zombieCount; i++) {
        zombieImgList.push(zombieImg);
    }
}

function setupZombies() {
    createZombies();
}

function createZombies() {
    zombies = new Group();

    for (let zombieIndex = 0; zombieIndex < zombieCount; zombieIndex++) {
        let zombie = createSprite(200, 100);
        zombie.addImage(zombieImgList[zombieIndex]);
        zombie.friction = 0.1;
        zombie.setSpeed(0.4, 0);
        zombie.rotateToDirection = true;
        zombies.add(zombie);

        fillZombieGenome(zombieIndex);
    }

    // Change selected gene
    selectedGene = 0;
    changeSelectedGene();

    console.log(zombiesDNA);
}

function drawZombies() {
    changeDirection();

    if(zombies.length == 0) {
        let lastZombie = zombies.get(zombies.length);
        let lastZombieIndex = zombies.indexOf(lastZombie);
        saveDNA(lastZombieIndex);
        nextGen();
    }

    zombies.collide(walls, hitWall);
    zombies.collide(goal, reachedGoal);
}

function reachedGoal(zombie) {
    let zombieIndex = zombies.indexOf(zombie);
    saveDNA(zombieIndex);
    nextGen();
}

function saveDNA(zombieIndex) {
    //bestZombieDNA.push(zombiesDNA[zombieIndex]);
    bestZombieDNA=zombiesDNA[zombieIndex];
}

function fillZombieGenome(zombieIndex) {
    // Zombie genome
    // Add currently most successful zombie DNA
    zombiesDNA[zombieIndex] = [];
    zombiesDNA[zombieIndex].push(bestZombieDNA);

    // Mutate zombie DNA
    for (let i = 0; i < 1; i++) {
        let geneIndex = Math.round(random(0, possibleGenes.length - 1));
        let newGene = possibleGenes[geneIndex];

        zombiesDNA[zombieIndex].push(newGene);
    }
}

function changeDirection() {
    for (let i = 0; i < zombies.length; i++) {
        let gene = zombiesDNA[i][selectedGene];
        let direction = zombies[i].getDirection();

        if (gene == 'L') {
            direction=180;
        } else if (gene == 'R') {
            direction=0;
        } else if (gene == 'U') {
            direction=270;
        } else if (gene == 'D') {
            direction=90;
        } else if (gene == 'LD') {
            direction=135;
        } else if (gene == 'RD') {
            direction=45;
        } else if (gene == 'LU') {
            direction=225;
        } else if (gene == 'RU') {
            direction=315;
        }

        zombies[i].setSpeed(0.5, direction);
    }
}