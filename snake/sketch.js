var grid_size = 600;
var block_count = 20;

var snake;
var food;

var snake_color;
var food_color;

function setup() {
    createCanvas(grid_size, grid_size);
    snake_color = color(52, 103, 92);
    food_color = color(76, 181, 245);
    snake = new Snake(grid_size/block_count, snake_color, block_count);
    food = new Block(int(random(block_count)), int(random(block_count)), grid_size/block_count, food_color);
}

function draw() {
    background(179, 193, 0);
    food.render();
    if (snake.update(food)) {
        do {
            food = new Block(int(random(block_count)), int(random(block_count)), grid_size/block_count, food_color);
        } while(snake.inSnake(food));
    }
    snake.render();
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