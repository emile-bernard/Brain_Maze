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

    console.log(zombiesDNA);

    // Change direction
    // setTimeout(changeDirection, 2000);
}

function drawZombies() {
    changeDirection();

    if(zombies.length == 0) {
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
    bestZombieDNA = zombiesDNA[zombieIndex];
}

function fillZombieGenome(zombieIndex) {
    // // Reset all DNA
    // zombiesDNA = [];

    // Zombie genome
    // Add currently most successful zombie DNA
    zombiesDNA[zombieIndex] = bestZombieDNA;
    // Mutate zombie DNA
    mutateDNA(zombieIndex);
}

function changeDirection() {
    for (let i = 0; i < zombies.length; i++) {
        // zombies[i].attractionPoint(0.2, goal.position.x, goal.position.y);
        // for (let geneIndex = 0; geneIndex < zombiesDNA[i].length; geneIndex++) {
            // let gene = zombiesDNA[i][geneIndex];
            let gene = zombiesDNA[i];

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

            direction+=10;

            zombies[i].setSpeed(0.4, direction);
        // }
    }
    // Change direction
    setTimeout(changeDirection, 2000);
}

function mutateDNA(zombieIndex) {
    // Add random new genes
    //for(let i = 0; i < 1; i++) {
        let geneIndex = Math.floor(Math.random()*possibleGenes.length);
        let newGene = possibleGenes[geneIndex];
        console.log(geneIndex);
        console.log(newGene);

        // zombiesDNA[zombieIndex].push(newGene);
        zombiesDNA[zombieIndex]=newGene;

        // Repeat gene
        // for(let i = 0; i < 300; i++) {
        //     zombiesDNA[index].push(newGene);
        // }
    //}
}