let canvas;

let backgroundSong;

let walls;
let wallImg;

let goal;
let goalImg;

const zombieCount = 10;
let zombieImgList = [];
let zombies;
let possibleGenes = ['L', 'R', 'U', 'D', 'LD', 'RD', 'LU', 'RU'];
let zombiesDNA = [];
let bestZombieDNA = [];

let generationCount = 0;

function preload() {
    preloadBackgroundSong();
    preloadWallImg();
    preloadGoalImg();
    preloadZombieImg();
}

function setup() {
    canvas = createCanvas(1220, 580);

    registerButtons();

    setupBackgroundSong();
    setupWalls();
    setupGoal();
    setupZombies();
}

function draw() {
    drawBackground();
    drawGoal();
    drawZombies();
    drawGenerationCount();
    drawSprites();
}

