let canvas;
let backgroundSong;

let wallController = new WallController();
let goalController = new GoalController();

const zombieCount = 4;
let zombieController = new ZombieController(zombieCount);
let evolutionController = new EvolutionController();

function preload() {
    preloadBackgroundSong();
    wallController.preloadWallImg();
    goalController.preloadGoalImg();
    zombieController.preloadZombieImg();
}

function setup() {
    canvas = createCanvas(1220, 580);
    registerButtons();

    setupBackgroundSong();
    wallController.setupWalls();
    goalController.setupGoal();
    zombieController.setupZombies();
}

function draw() {
    drawBackground();
    goalController.drawGoal();
    zombieController.drawZombies();
    evolutionController.drawGenerationCount();
    drawSprites();
}

