class EvolutionController {
    constructor() {
        this.generationCount = 0;
        this.selectedGene = 0;
        this.possibleGenes = ['L', 'R', 'U', 'D', 'LD', 'RD', 'LU', 'RU'];
    }

    drawGenerationCount() {
        fill(255);
        noStroke();
        textSize(72);
        textAlign(CENTER, CENTER);

        text('Gen#: ' + this.generationCount, width/2, height/2);
    }

    nextGen() {
        this.generationCount++;
        this.resetZombies();
    }

    resetZombies() {
        for (let i = 0; i < zombieController.getZombies().length; i++) {
            zombieController.getZombies()[i].remove();
        }

        this.resetSelectedGene();

        zombieController.resetZombieGenome();
        zombieController.createZombies();
    }

    changeSelectedGene() {

        console.log('selectedGene: ');
        console.log(this.selectedGene);

        console.log('Number of genes');
        console.log(zombieController.getZombiesDNA()[0].length);

        if(this.selectedGene == zombieController.getZombiesDNA()[0].length) {
            this.selectedGene = 0;
        }
        this.selectedGene++;

        // console.log('selectedGene: ');
        // console.log(this.selectedGene);

        setTimeout(this.changeSelectedGene, 3000);
    }

    getSelectedGene() {
        return this.selectedGene;
    }

    resetSelectedGene() {
        this.selectedGene = 0;
    }

    getPossibleGenes() {
        return this.possibleGenes;
    }
}