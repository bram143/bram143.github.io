function Snake(block_size, color, edge, block_count) {
    this.body = [];
    this.direction = createVector(0, -1);

    this.speed = 120;
    this.last_time = millis();

    this.steerable = true;
    this.alive = true;

    this.block_count = block_count;

    this.body.push(new Block(10, 10, block_size, color, edge));
    this.body.push(new Block(11, 10, block_size, color, edge));
    this.body.push(new Block(12, 10, block_size, color, edge));

    this.update = function(food) {
        if(!this.alive) {
            return;
        }
        if(millis() - this.last_time > this.speed) {
            this.body.splice(this.body.length - 1, 1);
            this.body.unshift(new Block(this.body[0].x + this.direction.x, this.body[0].y + this.direction.y, this.body[0].size, this.body[0].color, this.body[0].edge));
            this.last_time = millis();

            if(food.equals(this.body[0])) {
                this.grow();
                return true;
            }

            this.steerable = true;
        }
        
        this.checkDeath();
        if(!this.alive) {
            this.direction = createVector(0, 0);
        }

        return false;
    }

    this.grow = function() {
        this.body.push(new Block(this.body[0].x + this.direction.x, this.body[0].y + this.direction.y, this.body[0].size, this.body[0].color, this.body[0].edge));
    }

    this.render = function() {
        for(var i = 0; i < this.body.length; i++) {
            this.body[i].render();
        }
    }

    this.setDirection = function(direction) {
        if(this.steerable && direction.angleBetween(this.direction) != PI) {
            this.direction = direction;
            this.steerable = false;
        }
    }

    this.checkDeath = function() {
        for(var i = 1; i < this.body.length; i++) {
            if(this.body[i].equals(this.body[0])) {
                this.alive = false;
                return;
            }
        }
        if(this.body[0].x < 0 || this.body[0].y < 0 || this.body[0].x > this.block_count -1 || this.body[0].y > this.block_count -1) {
            this.alive = false;
        }
    }

    this.inSnake = function(block) {
        for(var i = 0; i < this.body.length; i++) {
            if(this.body[i].x == block.x && this.body[i].y == block.y) {
                return true;
            }
        }
        return false;
    }
}