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
        this.zombiesAlive = [];

        this.zombies = new Group();

        for (let zombieIndex = 0; zombieIndex < zombieCount; zombieIndex++) {
            let zombie = createSprite(200, 100);
            zombie.addImage(this.zombieImgList[zombieIndex]);
            zombie.friction = 0.1;
            zombie.setSpeed(0.4, 0);
            zombie.rotateToDirection = true;
            this.zombies.add(zombie);

            this.zombiesAlive.push(this.zombies.indexOf(zombie));

            this.fillZombieGenome(zombieIndex);
        }

        // Change selected gene
        evolutionController.setSelectedGene(0);
        evolutionController.changeSelectedGene();

        console.log(this.zombiesDNA);
    }

    drawZombies() {
        this.changeDirection();

        if(this.zombies.length == 0) {
            //let lastZombie = zombies.get(zombies.length);
            // let lastZombieIndex = zombies.indexOf(lastZombie);

            let lastZombieIndex = this.zombiesAlive[0];
            // console.log('zombiesAlive: ' + zombiesAlive);
            // console.log('lastZombieIndex: ' + lastZombieIndex);
            this.saveDNA(lastZombieIndex);
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
        this.bestZombieDNA=this.zombiesDNA[zombieIndex];
    }

    fillZombieGenome(zombieIndex) {
        // Zombie genome
        // Add currently most successful zombie DNA
        this.zombiesDNA[zombieIndex] = [];
        this.zombiesDNA[zombieIndex].push(this.bestZombieDNA);

        // Mutate zombie DNA
        for (let i = 0; i < 1; i++) {
            let geneIndex = Math.round(random(0, evolutionController.getPossibleGenes().length - 1));
            let newGene = evolutionController.getPossibleGenes()[geneIndex];

            this.zombiesDNA[zombieIndex].push(newGene);
        }
    }

    changeDirection() {
        for (let i = 0; i < this.zombies.length; i++) {
            let gene = this.zombiesDNA[i][evolutionController.getSelectedGene()];
            let direction = this.zombies[i].getDirection();

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
            this.zombies[i].setSpeed(0.5, direction);
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