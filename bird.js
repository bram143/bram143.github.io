function Bird(img) {
	this.y = height/2;
	this.x = width/2 - 100;

	this.gravity = 0.7;
	this.jumpPower = 15;
	this.dy = 0;

	this.img = img;

	this.size = 40;

	this.dead = false;

	this.render = function() {
		image(img, this.x - (this.size/2), this.y - (this.size/2), this.size, this.size);
	}
		

	this.update = function() {
		this.dy += this.gravity;
		this.dy *= 0.9;
		this.y += this.dy;

		if(this.y < 0) {
			this.y = 0;
		}
		if(this.y> height - 10) {
			this.y = height - 10;
			this.dy = 0;
			this.die();
		}
	}

	this.jump = function() {
		if(!this.dead) {
			this.dy -= this.jumpPower;
		}
	}

	this.die = function() {
		this.dead = true;
	}
}