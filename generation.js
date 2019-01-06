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
        this.generationCount += 1;
        this.resetZombies();
    }

    resetZombies() {
        for (let i = 0; i < zombieController.getZombies().length; i++) {
            zombieController.getZombies()[i].remove();
        }
        zombieController.createZombies();
    }

    changeSelectedGene() {
        if(this.selectedGene == zombieController.getZombiesDNA()[0].length){
            this.selectedGene = 0;
        }
        this.selectedGene++;
        setTimeout(this.changeSelectedGene, 3000);
    }

    getSelectedGene() {
        return this.selectedGene;
    }

    setSelectedGene(geneValue) {
        this.selectedGene = geneValue;
    }

    getPossibleGenes() {
        return this.possibleGenes;
    }
}