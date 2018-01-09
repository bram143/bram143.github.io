var bird;
var pipes = [];

var pipeSpawn = 3000;
var score = 0;
var high_score = 0;

var previous_time;
var last_pipe_spawn = 0;

var bird_img;

var menu;

function preload() {
	bird_img = loadImage('assets/gaai.png');
}

function setup () {
	createCanvas(400, 600);
	bird = new Bird(bird_img);
	previous_time = millis();
	menu = true;
}

function draw() {
	var time_passed = millis() - previous_time;
	previous_time = millis();
	last_pipe_spawn += time_passed;
	background(135,206,250);

	if(menu) {
		drawMenu();
	} else {

		stroke(0);
		strokeWeight(1);
		drawPipes();

		bird.update();
		stroke(0);
		fill(255,215,0);
		rect(0, height-15, width, 15);
		bird.render();

		if(!bird.dead && last_pipe_spawn > pipeSpawn) {
			pipes.push(new Pipe());
			last_pipe_spawn = 0;
		}

		stroke(255);

		drawRestart();
		drawScore();

	}	
}

function restart() {
	bird = new Bird(bird_img);
	score = 0;
	pipes = [];
}

function keyPressed() {
	if (key == ' ') {
		bird.jump();
	}
	if(menu && key == ' ') {
		menu = false;
	}
}

function keyTyped() {
	if(bird.dead && key == 'r') {
		restart();
	}
}

function drawMenu() {
	strokeWeight(4);
	stroke(0);
	fill(255);
	textStyle(BOLD);
	textAlign(CENTER);
	textSize(38);
	text("FLAPPY", width/2 - 25, height/2 - 75);
	textSize(30);
	text("VLAAMSE", width/2 - 25, height/2 - 42);
	textSize(45);
	text("G A A I", width/2 - 25, height/2 );
	textSize(20);
	strokeWeight(0);
	fill(255);
	text("PRESS SPACE TO START", width/2 - 25, height/2 + 55);
	stroke(0);
	fill(218,165,32);
	rect(0, height-15, width, 15);
}

function drawPipes() {
	for(var i = 0; i < pipes.length; i++) {
		if(pipes[i].hits(bird)) {
			bird.die();
		}
		if(!bird.dead) {
			pipes[i].update();
			if(!pipes[i].passed && bird.x > pipes[i].x) {
				score++;
				pipeSpawn -= 10 *(score/5);
				pipes[i].passed = true;
			}
			pipes[i].render();
		}

		if(pipes[i].x < -pipes[i].w) {
			pipes.splice(i, 1);
			i--;
		}
	}
}

function drawScore() {
	if(!bird.dead) {
		textSize(40);
		fill(255);
		strokeWeight(3);
		stroke(0);
		text(score, width - 50, 50);
	}
}

function drawRestart() {
	if(bird.dead) {
		if(score > high_score) {
			high_score = score;
		}
		fill(255);
		textSize(32);
		strokeWeight(0);
		textAlign(LEFT);
		text('Score: ' + score, width/2 - 140, height/2);
		text('High Score: ' + high_score, width/2 - 140, height/2 + 30);

		textSize(25);
		text('Press R to restart', width/2 - 140, height/2 + 75);
	}
}