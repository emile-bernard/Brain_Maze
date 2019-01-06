class GoalController {
    constructor() {

    }

    preloadGoalImg() {
        this.goalImg = loadImage('assets/image/resized_brain.png');
    }

    setupGoal() {
        this.goal = createSprite(70, 520);
        this.goal.addImage(this.goalImg);
    }

    drawGoal() {
        this.goal.collide(zombieController.getZombies());
    }

    getGoal() {
        return this.goal;
    }
}