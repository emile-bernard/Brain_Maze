function preloadGoalImg() {
    goalImg = loadImage('assets/image/resized_brain.png');
}

function setupGoal() {
    goal = createSprite(70, 520);
    goal.addImage(goalImg);
}

function drawGoal() {
    goal.collide(zombies);
}