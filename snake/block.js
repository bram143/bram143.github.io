function Block(x, y, size, color, edge) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.edge = edge;
    this.color = color;

    this.render = function() {
        push();
        strokeWeight(4);
        stroke(this.edge);
        fill(this.color);
        rect(this.x*this.size, this.y*this.size, this.size, this.size);
        pop();
    }

    this.equals = function(block) {
        return (block.y == this.y) && (block.x == this.x);
    }
}