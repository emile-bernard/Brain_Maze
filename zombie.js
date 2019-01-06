class ZombieController {
    constructor(zombieCount) {
        this.zombieCount = zombieCount;

        this.zombieImgList = [];
        this.zombiesDNA = [];
        this.bestZombieDNA = [];
        this.zombiesAlive = [];
    }

    preloadZombieImg() {
        let zombieImg = loadImage('assets/image/resized_zombie.png');

        for(let i = 0; i < this.zombieCount; i++) {
            this.zombieImgList.push(zombieImg);
        }
    }

    setupZombies() {
        this.createZombies();
    }

    createZombies() {
        this.zombiesAlive = new Array(zombieCount);

        this.zombies = new Group();

        for (let zombieIndex = 0; zombieIndex < zombieCount; zombieIndex++) {
            let zombie = createSprite(200, 100);
            zombie.addImage(this.zombieImgList[zombieIndex]);
            zombie.friction = 0.1;
            zombie.setSpeed(zombieSpeed, 0);
            zombie.rotateToDirection = true;
            this.zombies.add(zombie);

            // this.zombiesAlive.push(this.zombies.indexOf(zombie));
            this.zombiesAlive[zombieIndex] = this.zombies.indexOf(zombie);

            this.fillZombieGenome(zombieIndex);
        }

        // Change selected gene
        // evolutionController.resetSelectedGene();
        evolutionController.changeSelectedGene();

        console.log('zombiesDNA: ');
        console.log(this.zombiesDNA);
    }

    drawZombies() {
        this.changeDirection();

        if(this.zombies.length == 1) {
            let lastZombieIndex = this.zombiesAlive[0];
            this.saveDNA(lastZombieIndex);
        }

        if(this.zombies.length == 0) {
            evolutionController.nextGen();
        }

        this.zombies.collide(wallController.getWalls(), wallController.hitWall);
        this.zombies.collide(goalController.getGoal(), this.reachedGoal);
    }

    reachedGoal(zombie) {
        let zombieIndex = this.zombies.indexOf(zombie);
        this.saveDNA(zombieIndex);
        evolutionController.nextGen();
    }

    saveDNA(zombieIndex) {
        //bestZombieDNA.push(zombiesDNA[zombieIndex]);
        this.bestZombieDNA = this.zombiesDNA[zombieIndex];

        // console.log('bestZombieDNA: ');
        // console.log(this.bestZombieDNA);
    }

    fillZombieGenome(zombieIndex) {
        // Zombie genome
        // Add currently most successful zombie DNA
        // this.zombiesDNA[zombieIndex] = [];

        // console.log('bestZombieDNA: ');
        // console.log(this.bestZombieDNA);

        // this.zombiesDNA[zombieIndex].push(this.bestZombieDNA);
        this.zombiesDNA[zombieIndex] = this.bestZombieDNA;

        // Mutate zombie DNA by adding one extra gene
        let geneIndex = Math.round(random(0, evolutionController.getPossibleGenes().length - 1));
        let newGene = evolutionController.getPossibleGenes()[geneIndex];

        console.log('newGene: ');
        console.log(newGene);

        this.zombiesDNA[zombieIndex].push(newGene);
        // this.zombiesDNA[zombieIndex] = newGene;
    }

    changeDirection() {
        for (let i = 0; i < this.zombies.length; i++) {
            let gene = this.zombiesDNA[i][evolutionController.getSelectedGene()];
            // let direction = this.zombies[i].getDirection();
            let direction = 0;

            // console.log('direction: ');
            // console.log(direction);

            if (gene == 'L') {
                direction = 180;
            } else if (gene == 'R') {
                direction = 0;
            } else if (gene == 'U') {
                direction = 270;
            } else if (gene == 'D') {
                direction = 90;
            } else if (gene == 'LD') {
                direction = 135;
            } else if (gene == 'RD') {
                direction = 45;
            } else if (gene == 'LU') {
                direction = 225;
            } else if (gene == 'RU') {
                direction = 315;
            } else {
                // console.log('No direction set!');
            }
            this.zombies[i].setSpeed(zombieSpeed, direction);
        }
    }

    resetZombieGenome() {
        this.zombiesDNA = [];

        for(let i=0; i<zombieCount; i++) {
            this.zombiesDNA.push([]);
        }
    }

    getZombies() {
        return this.zombies;
    }

    getZombiesDNA() {
        return this.zombiesDNA;
    }

    getBestZombieDNA() {
        return this.bestZombieDNA;
    }

    getZombiesAlive() {
        return this.zombiesAlive;
    }
}