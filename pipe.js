function Pipe() {
	this.min_opening = 100;
	this.opening = max(randomGaussian(110, 25), this.min_opening);
	this.top = random(0, height - this.opening);
	this.bottom = this.top + this.opening;
	this.x = width;
	this.w = 50;
	this.dx = 1.7;
	this.passed = false;

	this.render = function() {
		fill(50,205,50);
		rect(this.x, 0, this.w, this.top);
		rect(this.x - 5, this.top - 15, this.w + 10, 15);
		rect(this.x, this.bottom , this.w, height);
		rect(this.x - 5, this.bottom, this.w + 10, 15);
	}

	this.hits = function(bird) {
		return (bird.x > this.x && bird.x < this.x + this.w ) && ((bird.y - (bird.size/2)) < this.top || (bird.y + (bird.size/2)) > this.bottom)
	}

	this.update = function() {
		this.x -= this.dx;
	}
}