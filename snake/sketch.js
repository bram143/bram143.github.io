var grid_size = 600;
var block_count = 20;

var snake;
var food;
var score;

var snake_color;
var snake_edge;
var food_color;
var food_edge;
var background_color;

function setup() {
    createCanvas(grid_size, grid_size);
    score = 0;
    background_color = color(150, 150, 150);
    snake_color = color(132, 0, 255, 126);
    snake_edge = color(76, 0, 148);
    food_color = color(255, 217, 0);
    food_edge = color(255, 187, 0);
    snake = new Snake(grid_size/block_count, snake_color, snake_edge, block_count);
    food = new Block(int(random(block_count)), int(random(block_count)), grid_size/block_count, food_color, food_edge);
}

function draw() {
    background(background_color);
    food.render();
    if (snake.update(food)) {
        score++;
        do {
            food = new Block(int(random(block_count)), int(random(block_count)), grid_size/block_count, food_color, food_edge);
        } while(snake.inSnake(food));
    }
    snake.render();
    renderScore();
}

function renderScore() {
    push();
    stroke(53, 201, 0);
    strokeWeight(7);
    fill(68, 255, 0);
    textStyle(BOLD);
    textSize(50);
    text(score, width - 50, 50);
    pop();
}

function keyPressed() {
    if(snake.alive) {
        if (keyCode == LEFT_ARROW) {
            snake.setDirection(createVector(-1, 0));
        } else if (keyCode == RIGHT_ARROW) {
            snake.setDirection(createVector(1, 0));
        } else if (keyCode == UP_ARROW ) {
            snake.setDirection(createVector(0, -1));
        } else if (keyCode == DOWN_ARROW) {
            snake.setDirection(createVector(0, 1));
        }
    }
}