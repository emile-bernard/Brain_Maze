class WallController {
    constructor() {

    }

    preloadWallImg() {
        this.wallImg = loadImage('./assets/image/original_box.png');
    }

    setupWalls() {
        this.walls = new Group();

        this.setupMiddleWalls();

        //Surrounding Walls
        let bottomWall = createSprite(
            width, height,
            width*2, 50);
        bottomWall.shapeColor = color('#353836');
        this.walls.add(bottomWall);

        let upperWall = createSprite(
            width, 0,
            width*2, 50);
        upperWall.shapeColor = color('#353836');
        this.walls.add(upperWall);

        let leftWall = createSprite(
            0, height,
            50, height*2);
        leftWall.shapeColor = color('#353836');
        this.walls.add(leftWall);

        let rightWall = createSprite(
            width, height,
            50, height*2);
        rightWall.shapeColor = color('#353836');
        this.walls.add(rightWall);
    }

    setupMiddleWalls() {
        let wallWidth = 400;
        let wallHeight = 40;

        let wallXPos = 220;
        let wallYPos = (height/2)+100;

        //Middle Walls
        let middleWall = createSprite(
            wallXPos, wallYPos,
            wallWidth, wallHeight);
        middleWall.shapeColor = color('#6e5018');

        // middleWall.addImage(wallImg);
        this.walls.add(middleWall);
    }

    hitWall(zombie) {
        let deadZombieNumber = zombieController.getZombies().indexOf(zombie);
        let deadZombieIndex = zombieController.getZombiesAlive().indexOf(deadZombieNumber);
        zombieController.getZombiesAlive().splice(deadZombieIndex, 1);
        zombie.remove();
    }

    getWalls() {
        return this.walls;
    }
}